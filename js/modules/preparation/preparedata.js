export function prepareData(obj) {
	const dataArr = [];
	for (const key in obj) {
		const data = obj[key];
		data["id"] = key;
		dataArr.push(data);
	}
	return dataArr;
}