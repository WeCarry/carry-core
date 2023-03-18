import { toJson } from "./toJson";

describe("toJson", () => {
	it("should stringify a valid object", () => {
		const obj = { key: "value" };
		const expectedJson = '{"key":"value"}';

		expect(toJson(obj)).toBe(expectedJson);
	});

	it("should stringify an array", () => {
		const arr = [1, 2, 3];
		const expectedJson = "[1,2,3]";

		expect(toJson(arr)).toBe(expectedJson);
	});

	it("should stringify a Set", () => {
		const set = new Set([1, 2, 3]);
		const expectedJson = "[1,2,3]";

		expect(toJson(set)).toBe(expectedJson);
	});

	it("should stringify a Map", () => {
		const map = new Map([
			["key1", "value1"],
			["key2", "value2"],
		]);
		const expectedJson = '[["key1","value1"],["key2","value2"]]';

		expect(toJson(map)).toBe(expectedJson);
	});

	it("should stringify a Date", () => {
		const date = new Date("2021-01-01T00:00:00Z");
		const expectedJson = '"2021-01-01T00:00:00.000Z"';

		expect(toJson(date)).toBe(expectedJson);
	});

	it("should stringify a RegExp", () => {
		const regex = /test/i;
		const expectedJson = '"/test/i"';

		expect(toJson(regex)).toBe(expectedJson);
	});

	it("should return undefined when JSON.stringify throws an error", () => {
		const circularObj: any = {};
		circularObj.circularRef = circularObj;

		jest.spyOn(console, "error").mockImplementation(() => {});

		expect(toJson(circularObj)).toBeUndefined();
		expect(console.error).toHaveBeenCalled();

		(console.error as jest.Mock).mockRestore();
	});

	it("should return a string when JSON.stringify returns a non-string value", () => {
		const obj = { toJSON: () => 123 };
		const expectedJson = "123";

		expect(toJson(obj)).toBe(expectedJson);
	});
});
