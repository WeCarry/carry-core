import { BaseError } from "./base-error";

export class ConflictError extends BaseError {
	constructor(message: string) {
		super(message);

		Object.setPrototypeOf(this, ConflictError.prototype);
	}
}
