export function addDays(days: number, date = new Date()): Date {
	const result = new Date(date.valueOf());

	result.setDate(result.getDate() + days);

	return result;
}

export function addMinutes(minutes: number, date = new Date()): Date {
	return new Date(date.getTime() + minutes * 60000);
}

export function addHours(hours: number, date = new Date()): Date {
	return new Date(date.getTime() + hours * 3600000);
}

export function addSeconds(seconds: number, date = new Date()): Date {
	return new Date(date.getTime() + seconds * 1000);
}

export function addMonths(months: number, date = new Date()): Date {
	const result = new Date(date);

	result.setMonth(result.getMonth() + months);
	
	return result;
}

export function addYears(years: number, date = new Date()): Date {
	const result = new Date(date);

	result.setFullYear(result.getFullYear() + years);

	return result;
}

export function getUtc(date?: Date): Date {
	date = (date === undefined) ? new Date() : date;

	return addMinutes(date.getTimezoneOffset(), date);
}

export function getDate(timezoneOffset: number, date?: Date): Date {
	return addMinutes(-timezoneOffset, getUtc(date));
}

export function isInvalidDate(date: Date): boolean {
	return (date instanceof Date) && isNaN(date as any);
}

export function midnight(utc?: boolean): Date;
export function midnight(date?: Date, utc?: boolean): Date;
export function midnight(date?: Date | boolean, utc = false): Date {
	if (typeof(date) === 'boolean') {
		utc  = date;
		date = new Date();
	} else {
		date = date || new Date();
	}

	if (utc) {
		return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
	}

	return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function isMidnight(date: Date, utc = false): boolean {
	const hours = utc ? date.getUTCHours() : date.getHours();
	const minutes = utc ? date.getUTCMinutes() : date.getMinutes();
	const seconds = utc ? date.getUTCMilliseconds() : date.getSeconds();
	const milliseconds = utc ? date.getUTCMilliseconds() : date.getMilliseconds();

	return (hours === 0 && minutes === 0 && seconds === 0 && milliseconds === 0);
}

export function getDayOfWeek(utc?: boolean, useMonday?: boolean): Number;
export function getDayOfWeek(date?: Date, utc?: boolean, useMonday?: boolean): Number;
export function getDayOfWeek(date?: Date | boolean, utc = false, useMonday = false): Number {
	if (typeof date === "boolean") {
		useMonday = utc;
		utc = date;
		date = new Date();
	} else {
		date = (date || new Date());
	}

	let days = utc ? date.getUTCDay() : date.getDay();

	if (useMonday) {
		days = (days === 0) ? 6 : days-1;
	}

	return days;
}

export function beginningOfWeek(utc?: boolean, useMonday?: boolean): Date;
export function beginningOfWeek(date?: Date, utc?: boolean, useMonday?: boolean): Date;
export function beginningOfWeek(date?: Date | boolean, utc = false, useMonday = false): Date {
	if (typeof date === "boolean") {
		useMonday = utc;
		utc = date;
		date = new Date();
	} else {
		date = (date || new Date());
	}

	date = midnight(date, utc);

	return addDays(
		-getDayOfWeek(date, utc, useMonday),
		date
	);
}

export function beginningOfMonth(utc?: boolean): Date;
export function beginningOfMonth(date?: Date, utc?: boolean): Date;
export function beginningOfMonth(date?: Date | boolean, utc = false): Date {
	if (typeof date === "boolean") {
		utc = date;
		date = new Date();
	} else {
		date = (date || new Date());
	}

	return (
		utc ? new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1)) : new Date(date.getFullYear(), date.getMonth(), 1)
	);
}

export function beginningOfYear(utc?: boolean): Date;
export function beginningOfYear(date?: Date, utc?: boolean): Date;
export function beginningOfYear(date?: Date | boolean, utc = false): Date {
	if (typeof date === "boolean") {
		utc = date;
		date = new Date();
	} else {
		date = (date || new Date());
	}

	return (
		utc ? new Date(Date.UTC(date.getUTCFullYear(), 0, 1)) : new Date(date.getFullYear(), 0, 1)
	);
}