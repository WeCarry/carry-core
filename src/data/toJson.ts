function toJson(obj: any): string {
	try {
		const jsonString = JSON.stringify(obj);
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
		return "";
	}
}
