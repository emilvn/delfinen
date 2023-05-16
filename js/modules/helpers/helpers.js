export function resetLocalStorage(str) {
	localStorage.removeItem(str);
}

export function reDirect(pageName) {
	window.location = `${pageName}.html`;
}

export function calculateAge(birthdate){
	const dateOfBirth = new Date(birthdate);
	const today = new Date();

	let age = today.getFullYear() - dateOfBirth.getFullYear();
	const monthDifference = today.getMonth() - dateOfBirth.getMonth();
	const dayDifference = today.getDate() - dateOfBirth.getDate();

	if(monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)){
		age--;
	}
	return age;
}