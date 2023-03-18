export function toJson(obj: any): string | undefined {
	const isObject = (value: any) =>
		typeof value === "object" && value !== null;

	const stringifyReplacer = (key: string, value: any) => {
		if (isObject(value)) {
			if (value instanceof Set) {
				return [...value];
			}

			if (value instanceof Map) {
				return Array.from(value.entries());
			}

			if (value instanceof Date) {
				return value.toISOString();
			}

			if (value instanceof RegExp) {
				return value.toString();
			}
		}
		return value;
	};

	try {
		const jsonString = JSON.stringify(obj, stringifyReplacer);
		if (typeof jsonString !== "string") {
			throw new Error("JSON.stringify did not return a string");
		}
		return jsonString;
	} catch (error) {
		if (error instanceof Error) {
			console.error(
				`Error converting object to JSON: ${error.message}\n${error.stack}`
			);
		} else {
			console.error(`Unknown error occurred: ${error}`);
		}
		return undefined;
	}
}
