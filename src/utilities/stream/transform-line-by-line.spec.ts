/*
import "jasmine";
import { TransformLineByLine } from "./transform-line-by-line";
import { Readable } from "stream";
import os from 'os';

function mockStream(data: string[]): Readable {
	const stream = new Readable();
	let count = 0;

	stream._read = function(size) {
		if (count >= data.length) {
			this.push(null);
			return;
		}

		this.push(data[count]);
		count++;
	}

	return stream;
}

function delay(ms: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

describe('Transform Line-by-line', () => {
	it('should call transform for each line', done => {
		let callCount = 0;
		let result = '';

		const transform = new TransformLineByLine(async (line) => {
			callCount++;

			await delay(5);

			return `-${line}-`;
		});

		mockStream(['a','b', 'c', '\r\n', 'd']).pipe(transform)
			.on('data', data => result += data)
			.on('end', () => {
				expect(result).toBe('-abc-\r\n-d-');
				expect(callCount).toBe(2);
				done();
			});
	});

	it('should call transform even when there are no end carriage return or line feed', done => {
		let callCount = 0;
		let result = '';

		const transform = new TransformLineByLine(async (line) => {
			callCount++;
			return `--${line}--`;
		});

		mockStream(['a']).pipe(transform)
			.on('data', data => result += data)
			.on('end', () => {
				expect(result).toBe('--a--')
				expect(callCount).toBe(1);
				done();
			});
	});

	it('should call tranform for line feed', done => {
		let callCount = 0;
		let result = '';

		const transform = new TransformLineByLine(async (line) => {
			callCount++;
			return `--${line}--`;
		});

		mockStream(['a\nb']).pipe(transform)
			.on('data', data => result += data)
			.on('end', () => {
				expect(result).toBe(`--a--${os.EOL}--b--`)
				expect(callCount).toBe(2);
				done();
			});
	});

	it('should call tranform for carrage return', done => {
		let callCount = 0;
		let result = '';

		const transform = new TransformLineByLine(async (line) => {
			callCount++;
			return `--${line}--`;
		});

		mockStream(['a\rb']).pipe(transform)
			.on('data', data => result += data)
			.on('end', () => {
				expect(result).toBe(`--a--${os.EOL}--b--`)
				expect(callCount).toBe(2);
				done();
			});
	});

	it('should call tranform once for carrage return followed by line feed', done => {
		let callCount = 0;
		let result = '';

		const transform = new TransformLineByLine(async (line) => {
			callCount++;
			return `--${line}--`;
		});

		mockStream(['a\r\nb']).pipe(transform)
			.on('data', data => result += data)
			.on('end', () => {
				expect(result).toBe(`--a--${os.EOL}--b--`)
				expect(callCount).toBe(2);
				done();
			});
	});

	it('should not call tranform when called with an empty stream', done => {
		let callCount = 0;
		let result = '';

		const transform = new TransformLineByLine(async (line) => {
			callCount++;
			return `--${line}--`;
		});

		mockStream(['']).pipe(transform)
			.on('data', data => result += data)
			.on('end', () => {
				expect(result).toBe('----')
				expect(callCount).toBe(1);
				done();
			});
	});

	it('should call tranform for an empty last line', done => {
		let callCount = 0;
		let result = '';

		const transform = new TransformLineByLine(async (line) => {
			callCount++;
			return `--${line}--`;
		});

		mockStream(['a\r\n']).pipe(transform)
			.on('data', data => result += data)
			.on('end', () => {
				expect(result).toBe('--a--\r\n\----')
				expect(callCount).toBe(2);
				done();
			});
	});

	it('should support utf-8 characters', done => {
		let callCount = 0;
		let result = '';

		const transform = new TransformLineByLine(async (line) => {
			callCount++;
			return `--${line}--`;
		});

		mockStream(['abc\r\nf123\r\n汉字456']).pipe(transform)
			.on('data', data => result += data)
			.on('end', () => {
				expect(result).toBe('--abc--\r\n--f123--\r\n--汉字456--')
				expect(callCount).toBe(3);
				done();
			});
	});
});
*/