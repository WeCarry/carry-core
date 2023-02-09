import { Readable } from "stream";

export function streamToArray<T, U = T>(stream: Readable, map?: (item: T) => U) : Promise<U[]> {
	return new Promise<U[]>((resolve, reject) => {
		const result: U[] = [];
		let done = false;

		function onData(item: T) {
			if (!done) {
				if (map){
					result.push(map(item));
				} else {
					result.push(item as any);
				}
			}
		}

		function onError(err: any) {
			if (!done) {
				done = true;
				reject(err);
			}
		}

		function onEnd() {
			if (!done) {
				done = true;

				stream.removeListener('data', onData);
				stream.removeListener('error', onError);
				stream.removeListener('end', onEnd);
				stream.removeListener('close', onEnd);

				resolve(result);
			}
		}

		stream.on('data', onData);
		stream.on('error', onError);
		stream.on('end', onEnd);
		stream.on('close', onEnd);
	});
}