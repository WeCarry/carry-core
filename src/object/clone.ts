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

// Example usage:

class CustomClass {
	constructor(public a: number, public b: number) {}
}

const originalObject = {
	a: 1,
	b: {
		c: new CustomClass(2, 3),
	},
};

const originalArray = [1, [2, 3], { a: new CustomClass(4, 5) }];
const originalMap = new Map<number, string | CustomClass>([
	[1, "one"],
	[2, "two"],
	[3, new CustomClass(6, 7)],
]);
const originalSet = new Set<number | CustomClass>([
	1,
	2,
	3,
	new CustomClass(8, 9),
]);

const clonedObject = deepClone(originalObject);
const clonedArray = deepClone(originalArray);
const clonedMap = deepClone(originalMap);
const clonedSet = deepClone(originalSet);

console.log("Original object:", originalObject);
console.log("Cloned object:", clonedObject);

console.log("Original array:", originalArray);
console.log("Cloned array:", clonedArray);

console.log("Original Map:", originalMap);
console.log("Cloned Map:", clonedMap);

console.log("Original Set:", originalSet);
console.log("Cloned Set:", clonedSet);
