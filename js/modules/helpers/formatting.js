/* ========== DATA FORMATTING FUNCTIONS ========== */
export function capitalize(str){
    const lowerCaseStr = str.toLowerCase();
    return lowerCaseStr[0].toUpperCase() + lowerCaseStr.substring(1);
}

export function sortUsersNameAlphabetically(users) {
    users.sort((a, b) => a.name.localeCompare(b.name));
}