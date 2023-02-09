import { BaseError } from "./base-error";

export class InnerError extends BaseError {
	constructor(message: string, error: any) {
		super(message)

		Object.setPrototypeOf(this, InnerError.prototype);

		this.innerError = error;
	}

	readonly innerError: any;
}
