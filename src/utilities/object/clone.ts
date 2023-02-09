export function clone<T>(obj: T): T {
	if (obj === null || typeof obj !== 'object') {
		return obj;
	}
	if (obj instanceof Array) {
		return obj.map((element) => clone(element)) as T;
	}
	const cloned = {} as T;
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			cloned[key] = clone(obj[key]);
		}
	}
	return cloned;
}
