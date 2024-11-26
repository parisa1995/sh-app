
const firstNameEl = document.getElementById("first_name");
const lastNameEl = document.getElementById("last_name");
const emailEl = document.getElementById("email");

let splitedUrl = document.location.href.split("=");
let serverUrl = `http://localhost:3600/api/users/${splitedUrl[1]}`

fetch(serverUrl)
.then((response) => {
    return response.json();
}).then((userDetail) => {
    const data = userDetail.data;
    const user = data[0];
    firstNameEl.textContent = user.first_name;
    lastNameEl.textContent = user.last_name;
    emailEl.textContent = user.email;
})