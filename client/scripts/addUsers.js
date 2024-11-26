const serverUrl = "http://localhost:3600/api/users/"

function addUser() {
    const firstNameEl = document.getElementById('first_name');
    const lastNameEl = document.getElementById('last_name');
    const emailEl = document.getElementById('email');

    if(!firstNameEl.value || !lastNameEl.value || !emailEl) {
        Swal.fire({
            icon: 'error',
            title: "Ooops!",
            text: 'Please enter the the require data first!'
          })
    } else {
        const user = {
            first_name: firstNameEl.value,
            last_name: lastNameEl.value,
            email: emailEl.value,
        }

        fetch(serverUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(user),
          })
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              Swal.fire({
                icon: "success",
                title: "Saved!",
                text: "User saved into the database.",
              });
              window.location.replace(
                window.location.origin + "/pages/users/user.html"
              );
            })
            .catch((error) => {
              console.log(error);
            });
        }


        
      }
