import { BaseError } from "./base-error";

export class BadRequestError extends BaseError {
	constructor(message = "Bad Request smth went wrong") {
		super(message);

		Object.setPrototypeOf(this, BadRequestError.prototype);
	}
}
