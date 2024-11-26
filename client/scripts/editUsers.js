const serverUrl = "http://localhost:3600/api/users/";

const uuid = window.location.href.split("=")[1];

const userFirstName = document.getElementById('first_name');
const userLastName = document.getElementById('last_name');
const email = document.getElementById('email');

fetch(`${serverUrl}/${uuid}`)
.then(response => {
    // console.log(response)
    return response.json()
}).then((data) => {
    const user = data.data[0];
    userFirstName.value = user.first_name;
    userLastName.value = user.last_name;
    email.value = user.email;
});

function updateUser() {
    const updatedUser = {
        first_name: userFirstName.value,
        last_name: userLastName.value,
        email: email.value,
    };
    fetch(`${serverUrl}/${uuid}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedUser)
    })
    .then((response) => response.json())
    .then((data) => {
        window.location.replace(
            window.location.origin + "/pages/users/user.html"
          );
    });
}

