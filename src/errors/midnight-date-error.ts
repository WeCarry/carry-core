import { BaseError } from "./base-error";

export const ERROR_MESSAGE = 'Date must be midnight UTC.';

export class MidnightDateError extends BaseError {
	constructor(message = ERROR_MESSAGE) {
		super(message);

		Object.setPrototypeOf(this, BaseError.prototype);
	}
}
