import * as stream from 'stream';

type BufferItem = {
	item: any,
	processed: boolean
}

export function mapStream<T>(input: stream.Readable, map: (value: T) => T | PromiseLike<T>): stream.Readable {
	let done = false;
	let buffer: BufferItem[] = [];
	let waiting = false;

	const output = new stream.Readable({
		objectMode: true,
		read() {
			if (buffer.length) {
				if (buffer[0].processed) {
					const result = buffer.splice(0, 1)[0].item;

					waiting = false;

					output.push(result);
				} else {
					waiting = true;
				}
			} else {
				if (done) {
					waiting = false;
					this.push(null);
				} else {
					waiting = true;
				}
			}
		}
	});

	input.on('data', async (item: T) => {
		const bufferItem = { item: item, processed: false };

		buffer.push(bufferItem);

		try {
			const value = await map(item);

			if (!value) {
				const index = buffer.indexOf(bufferItem);

				if (index > -1) {
					buffer.splice(index, 1);
				}

				if (waiting && index === 0 && buffer[0].processed) {
					waiting = false;
					output.push(buffer.splice(0, 1)[0].item);
				}

				return;
			}

			bufferItem.item = value;
			bufferItem.processed = true;

			if (waiting && bufferItem === buffer[0]) {
				waiting = false;

				output.push(buffer.splice(0, 1)[0].item);
			}
		} catch (err) {
			const index = buffer.indexOf(bufferItem);

			if (index > -1) {
				buffer.splice(index, 1);
			}

			if (waiting && index === 0) {
				if (buffer.length && buffer[0].processed) {
					waiting = false;
					output.push(buffer.splice(0, 1)[0].item);
				} else if (done) {
					waiting = false;
					output.push(null);
				}
			}

			output.emit('error', err);
		}
	});

	input.on('error', (err: any) => {
		output.emit('error', err);
	});

	input.on('end', () => {
		done = true;

		if (waiting && !buffer.length) {
			waiting = false;
			output.push(null);
		}
	});

	return output;
}
