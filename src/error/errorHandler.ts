export class ErrorHandler extends Error {
	public readonly name: string;
	public readonly message: string;
	public readonly stackTrace: string;

	constructor(message: string, stackTrace?: string) {
		super(message);
		this.name = this.constructor.name;
		this.message = message;
		this.stackTrace = stackTrace ?? new Error().stack!;
		console.error(`${this.name}: ${this.message}\n${this.stackTrace}`);
	}
}
