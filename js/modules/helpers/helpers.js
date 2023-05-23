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

export function getTeamFromAge(age){
	if(age < 18){
		return "junior";
	}
	return "senior";
}

export const categoriesInDanish = {
    breaststroke: "brystsvømning",
    crawl: "crawl",
    backcrawl: "rygcrawl",
    butterfly: "fly"
}

export function setTodayAsMaxDate(inputId){
	const inputField = document.querySelector(`#${inputId}`);

	const today = new Date();
	/* Formatting */
	const yyyy = today.getFullYear();
	const mm = String(today.getMonth() + 1).padStart(2, "0");//adding 1 to get correct month
	const dd = String(today.getDate()).padStart(2, "0");
	const formattedDate = `${yyyy}-${mm}-${dd}`;

	inputField.setAttribute("max", formattedDate);
}

export function sortArrayByKeyAscending(arr, key) {
    arr.sort(function(a, b) {
		var keyA = a[key];
		var keyB = b[key];
		if (keyA < keyB) {
			return -1;
		}
		if (keyA > keyB) {
			return 1;
		}
		return 0;
	});
	return arr;
}

export function sortArrayByKeyDescending(arr, key) {
    arr.sort(function(a, b) {
        var keyA = a[key];
        var keyB = b[key];
        if (keyA > keyB) {
            return -1;
        }
        if (keyA < keyB) {
            return 1;
        }
        return 0;
    });
    return arr;
}