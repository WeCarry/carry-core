export function replaceAll(value: string, search: string, replacement: string): string {
	if (!value) {
		return value;
	}

	return value.replace(new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacement);
}

export function randomString(length: number, chars: string) {
	let mask = '';
	if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
	if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	if (chars.indexOf('#') > -1) mask += '0123456789';
	if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';

	let result = '';

	if (mask) {
		for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
	}

	return result;
}

export function toCsv(items: string[]): string {
	const result: string[] = [];

	for (let term of items) {
		term = (term === undefined) ? '' : term;

		if (term.match && term.match(/,|"|\r|\n/))  {
			result.push(`"${term.replace('"','""')}"`);
		} else {
			result.push(term);
		}			
	}

	return result.join(',');
}

export function encodeHtml(value: string): string {
	return value.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');	
}

export function isInteger(str: string): boolean {
	const n = Math.floor(Number(str));

	return n !== Infinity && String(n) === str;
}

export function nthIndexOf(str: string, searchString: string, index: number): number {
	return str.split(searchString, index).join(searchString).length;
}

export function sanitizeFilename(str: string): string {
	return (str || '').replace(/['’]/g, '').replace(/[/\\?%*:|"<> ]/g, '-');
}