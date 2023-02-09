import { Transform, TransformOptions, TransformCallback} from 'stream';

/**
 * A stream that can be used to minipulate each line of data.
 */
export class TransformLineByLine extends Transform {
	private _buffer: string = '';
	private _carriageReturn = false;

	/**
	 * Creates an instance of the transform line class.
	 * 
	 * @param _transformLine - The function to be called for each line of data
	 * @param opts - Standard transform options
	 * 
	 */
	constructor(private _transformLine: (line: string) => Promise<any>, opts?: TransformOptions) {
		super(opts)
	}

	_transform(chunk: any, encoding: string, callback: TransformCallback) {
		this.processChunk(chunk)
			.then(() => callback())
			.catch(err => callback(err))
	}

	_flush(callback: TransformCallback) {
		this.processChunk(null)
			.then(() => callback())
			.catch(err => callback(err))
	}

	/**
	 * Processes the next chuck of data and calls transform on each line. It should be called with null
	 * to specify the end of the stream.
	 * 
	 * @param chunk - The chunk of data to process.
	 * 
	 * @returns A promise to keep track of the progress
	 */
	private async processChunk(chunk: any | null): Promise<void> {
		if (!chunk) {
			const value = await this._transformLine(this._buffer);

			if (value !== null) {
				this.push(value);
			}
			
			this._buffer = '';

			return;
		}

		chunk = chunk.toString('utf8');
		
		for (const char of chunk) {
			if (char === '\n' || this._carriageReturn) {
				const value = await this._transformLine(this._buffer);

				if (value !== null) {
					this.push(value);
				}
				
				this._buffer = '';
				this._carriageReturn = false;

				if (char === '\n') {
					continue;
				}
			}

			if (char === '\r') {
				this._carriageReturn = true;
				continue;
			}

			this._buffer += char;
		}
	}
}