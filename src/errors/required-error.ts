import { BaseError } from "./base-error";

export class RequiredError extends BaseError {
	constructor(message: string) {
		super(message);

		Object.setPrototypeOf(this, RequiredError.prototype);
	}
}
