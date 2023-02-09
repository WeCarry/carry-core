export type Base64Details = {
	contentType?: string,
	fileType?: string,
	encoding?: string,
	data: string
};

export function getBase64Details(fileData: string, contentType = ''): Base64Details {
	let index = fileData.indexOf(',');
	const data = (index < 0) ? fileData : fileData.substring(index + 1);
	let encoding = '';

	if (index > -1) {
		let header = fileData.substring(0, index);
	
		if ((index = header.indexOf(':')) > -1) {
			header = header.substring(index + 1);
			index = header.indexOf(';');
		
			if (index > -1) {
				encoding = header.substring(index + 1);
				header = header.substring(0, index);
			}
		
			contentType = header;
		}
	}

	return {
		data,
		contentType,
		encoding
	}
}