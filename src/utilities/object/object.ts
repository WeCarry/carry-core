export type PathValue = {
	parent: any;
	member: string;
	value: any;
};

export function parseJSON<T = any>(jsonString: string): T | null {
	try {
		return JSON.parse(jsonString) as T;
	} catch (e) {
		console.error(e);
		return null;
	}
}
