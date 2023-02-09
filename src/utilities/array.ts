export function unique<T>(arr: T[]): T[] {
	return arr.filter((value, index) => {
    return arr.indexOf(value) === index;
	});
}

export function toArray<T>(arr: T | T[]): T[] {
	return (arr instanceof Array) ? arr : [arr];
}