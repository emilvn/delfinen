export function resetLocalStorage(str) {
	localStorage.removeItem(str);
}

export function reDirect(pageName) {
	window.location = `${pageName}.html`;
}