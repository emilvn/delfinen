export function displayUsers(users) {
    for (const user of users) {
        const html = /*html*/`
            <tr class="name"> 
                <td> ${user.name}: </td> 
                <td>  <input type="number" class="restance" name="restance" data-user="${user.id}"> </td>   
            </tr>
        `;
        document.querySelector('#user-name').insertAdjacentHTML('beforeend', html);
    }
}