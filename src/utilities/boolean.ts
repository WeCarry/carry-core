export function parseBoolean(value: string): boolean {
	if (!value) {
		return false;
	}

	value = value.toLowerCase();
	
	return ['true', 't', 'yes', 'y', '1'].indexOf(value) > -1;
}

export function isBoolean(value: string): boolean {
	return ['true', 'false', 't', 'f', 'yes', 'no', 'y', 'n', '1', '0'].indexOf(value.toLowerCase()) > -1;
}