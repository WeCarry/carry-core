import { ErrorHandler } from "./errorHandler";

describe("ErrorHandler", () => {
	it("should log an error message with the stack trace", () => {
		const consoleSpy = jest.spyOn(console, "error").mockImplementation();

		const errorMessage = "Something went wrong";
		const errorStackTrace = "Error stack trace";
		const errorHandler = new ErrorHandler(errorMessage, errorStackTrace);

		expect(errorHandler.message).toBe(errorMessage);
		expect(errorHandler.stackTrace).toBe(errorStackTrace);

		expect(consoleSpy).toHaveBeenCalledWith(
			`${errorHandler.name}: ${errorMessage}\n${errorStackTrace}`
		);

		consoleSpy.mockRestore();
	});

	it("should log an error message without the stack trace", () => {
		const consoleSpy = jest.spyOn(console, "error").mockImplementation();

		const errorMessage = "Something went wrong";
		const errorHandler = new ErrorHandler(errorMessage);

		expect(errorHandler.message).toBe(errorMessage);
		expect(errorHandler.stackTrace).toBeDefined();

		expect(consoleSpy).toHaveBeenCalledWith(
			`${errorHandler.name}: ${errorMessage}\n${errorHandler.stackTrace}`
		);

		consoleSpy.mockRestore();
	});
});
