type Cloneable = object | Array<any> | Map<any, any> | Set<any>;

function isCloneable(value: any): value is Cloneable {
	return (
		typeof value === "object" &&
		value !== null &&
		(Array.isArray(value) ||
			value instanceof Map ||
			value instanceof Set ||
			Object.getPrototypeOf(value))
	);
}

export function deepClone<T extends Cloneable>(source: T): T {
	if (Array.isArray(source)) {
		return source.map((item) => deepClone(item)) as T;
	} else if (source instanceof Map) {
		const clonedMap = new Map();
		for (const [key, value] of source.entries()) {
			clonedMap.set(deepClone(key), deepClone(value));
		}
		return clonedMap as T;
	} else if (source instanceof Set) {
		const clonedSet = new Set();
		for (const value of source.values()) {
			clonedSet.add(deepClone(value));
		}
		return clonedSet as T;
	} else if (isCloneable(source)) {
		const clonedObject = Object.create(Object.getPrototypeOf(source));
		for (const key in source) {
			if (Object.prototype.hasOwnProperty.call(source, key)) {
				const value = source[key as keyof T];
				clonedObject[key as keyof T] = isCloneable(value)
					? deepClone(value)
					: value;
			}
		}
		return clonedObject;
	} else {
		return source as T;
	}
}
