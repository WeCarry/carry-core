import { Readable } from "stream";

export function waitForStream(stream: Readable) : Promise<void> {
	return new Promise<void>((resolve, reject) => {
		let done = false;

		function onError(err: any) {
			if (!done) {
				done = true;
				reject(err);
			}
		}

		function onEnd() {
			if (!done) {
				done = true;

				stream.removeListener('error', onError);
				stream.removeListener('end', onEnd);
				stream.removeListener('close', onEnd);

				resolve();
			}
		}

		stream.on('error', onError);
		stream.on('end', onEnd);
		stream.on('close', onEnd);
	});
}