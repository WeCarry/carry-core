import { BaseError } from './base-error';

export class MultipleErrors extends BaseError {
	constructor(message: string, errors: Error[]) {
		super(message);

		Object.setPrototypeOf(this, MultipleErrors.prototype);

		this.innerErrors = errors;
	}

	readonly innerErrors: Error[];
}

export function getErrors(items: any[]): Error | undefined {
	const errors: Error[] = [];

	for (const err of items) {
		if (err instanceof Error) {
			errors.push(err);
		}
	}

	if (errors.length === 1) {
		return errors[0];
	}

	if (errors.length > 1) {
		let errorNames: string[] = [];

		for (const e of errors) {
			errorNames.push(e.message);
		}

		return new MultipleErrors(errorNames.join(', '), errors);
	}
}
