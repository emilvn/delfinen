export function showNavDropdown(event){
	const expandButton = event.target;
	expandButton.removeEventListener("click", showNavDropdown);
	const navButtons = document.querySelector(".navGrid");
	navButtons.style.display = "block";
	expandButton.addEventListener("click", hideNavDropdown);
}

function hideNavDropdown(event){
	const expandButton = event.target;
	expandButton.removeEventListener("click", hideNavDropdown);
	const navButtons = document.querySelector(".navGrid");
	navButtons.style.display = "none";
	expandButton.addEventListener("click", showNavDropdown);
}

export function showFullNav(){
	const expandButton = document.querySelector("#navExpandButton");
	const navButtons = document.querySelector(".navGrid");
	if(window.innerWidth > 1000){
		expandButton.removeEventListener("click", hideNavDropdown);
		expandButton.addEventListener("click", showNavDropdown);
		navButtons.style.display = "grid";
	}
	else{
		navButtons.style.display = "none";
	}
}