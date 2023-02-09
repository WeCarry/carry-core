import { HttpError } from "./http-error";

export class HttpRedirectError extends HttpError {
	readonly location: string;

	constructor(err: any, location = '', statusCode = 300) {
		super(err, statusCode);

		Object.setPrototypeOf(this, HttpRedirectError.prototype);

		this.location = (err?.location || location );
	}
}