 const serverUrl = "http://localhost:3600/api/users/"


 /**
 * <tr class="border-2 border-dashed border-collapse border-gray-500 text-center ">
<td class="border-2 border-dashed border-collapse border-gray-500">Product A</td>
<td class="border-2 border-dashed border-collapse border-gray-500"> $20</td>
<td class="border-2 border-dashed border-collapse border-gray-500 ">
  <button class="bg-green-500 px-4 py-1 text-white my-2 rounded">View</button>
  <button class="bg-blue-500 px-4 py-1 text-white my-2 rounded" >Edite</button>
  <button class="bg-red-500 px-4 py-1 text-white my-2 rounded"  >Delete</button>
</td>
</tr>
 * 
 * 
 */
 const usersTable = document.getElementById('users')
 //get all users from the server

 fetch(serverUrl).then((response) =>{
    return response.json()
 }).then((users) =>{
    for(let i = 0; i< users.length; i++) {
      const user = users[i];

      const tr = document.createElement('tr');
      
        
      let tdUserFirstName = document.createElement('td');
      tdUserFirstName.textContent = user.first_name;
      tdUserFirstName.className = productColumn;
      
      let tdUserLastName = document.createElement('td');
      tdUserLastName.textContent = user.last_name;
      tdUserLastName.className = productColumn;

      let tdUserEmail = document.createElement('td');
      tdUserEmail.textContent = user.email;
      tdUserEmail.className = productColumn;
    

      const tdAction = document.createElement('td');
      tdAction.className = `${textCenter} ${productColumn}`
    
      const viewButton = document.createElement('a');
      viewButton.textContent = "View"
      viewButton.className = `${bgGreenColor} ${productButtonClass}`;
      viewButton.href = `/pages/users/user_detail.html?id=${user.uuid}`;

         const editButton = document.createElement('a');
         editButton.textContent = "Edit";
         editButton.className = `${bgBlueColor} ${productButtonClass}`;
         editButton.href = `/pages/users/edit_users.html?id=${user.uuid}`
         

         const deleteButton = document.createElement('button');
         deleteButton.textContent = "Delete";
         deleteButton.className = `${bgReadColor} ${productButtonClass}`;

         deleteButton.id = user.uuid;

         deleteButton.addEventListener("click", (el) => {
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) {
              deleteUser(el.target.id);
            }
          })
       })
    tdAction.appendChild(viewButton);
    tdAction.appendChild(editButton);
    tdAction.appendChild(deleteButton);
      
      tr.appendChild(tdUserFirstName);
      tr.appendChild(tdUserLastName);
      tr.appendChild(tdUserEmail);
      tr.appendChild(tdAction);

      usersTable.appendChild(tr);
    //   tdAction.appendChild(editButton);
    //   tdAction.appendChild(deleteButton);
    }
 })


 
 
 function deleteUser(uuid) {
  fetch(`${serverUrl}/${uuid}`, {
    method: "DELETE"
  }).then(response =>{
    return response.json()
  }).then((data) =>{
    Swal.fire({
      icon: "success",
      title: "Successfully DELETED!",
      text: "User deleted from the database.",
    });
   window.location.reload()
  })
.catch(error => {
  console.log("Could not delete the data.")
 })
}