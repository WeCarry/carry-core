import { BaseError } from "./base-error";

export class HttpError extends BaseError {
	private _statusCode: number;

	constructor(err: any, statusCode = 500) {
		super(err.message);

		Object.setPrototypeOf(this, HttpError.prototype);

		this._statusCode = (err?.statusCode || statusCode );
	}

	get statusCode(): number {
		return this._statusCode;
	}
}
