export function toString(err: any, includeStack = false) {
	if (typeof err === 'string') {
		return err;
	}

	if (includeStack && err?.stack) {
		return err.stack;
	}

	if (err?.message) {
		return err.message;
	}

	return err?.toString();
}