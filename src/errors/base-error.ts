export class BaseError extends Error {
	public name: string;
	public message: string;
	public stack?: string;

	constructor(message: string) {
		super(message);
		this.name = this.constructor.name;
		this.message = message;
		if (typeof Error.captureStackTrace === 'function') {
			Error.captureStackTrace(this, this.constructor);
		} else {
			this.stack = new Error(message).stack;
		}
	}

	public toJSON() {
		return {
			name: this.name,
			message: this.message,
			stack: this.stack,
		};
	}
}
