const serverUrl = "http://localhost:3600/api/products";

const productsTable = document.getElementById("products");
const errorDiv = document.getElementById("error");


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

fetch(serverUrl).then((response) => {
    // console.log(response);
     return response.json()
 }).then((products) =>{
 
     //Table
 
     for(let i = 0; i< products.length; i++) {
 
         const product = products[i];
 
         const tr = document.createElement('tr');
         tr.className = productColumn;
 
 
         const tdProductName = document.createElement('td');
         tdProductName.textContent = product.name;
         tdProductName.className = productColumn;
 
         const tdPrice = document.createElement('td');
         tdPrice.textContent = " $" + product.price;
         tdPrice.className = `${productColumn} ${textCenter}`;
 
         const tdAction = document.createElement('td');
         tdAction.className = "text-center"
         
         const viewButton = document.createElement('a');
         viewButton.href = `/pages/products/product-detail.html?id=${product.slug}`;
 
        const editButton = document.createElement('a');
        editButton.className =`${bgBlueColor} ${productButtonClass}`
        editButton.href = `/pages/products/edit_product.html?id=${product.slug}`;

        const deleteButton = document .createElement('button');
 
         tdAction.appendChild(viewButton);
         viewButton.className =`${bgGreenColor} ${productButtonClass}`;
         viewButton.textContent = "View";
 
         tdAction.appendChild(editButton);
         
         
        //  const editButton = document.createElement('button');
        //  editButton.className =`${bgBlueColor} ${productButtonClass}`
        //  editButton.addEventListener("click", (element) => {
        //     window.location.replace (
        //         window.location.origin + `/pages/products/edit_product.html?=id${product.slug}`
        //     )
        //  })
         editButton.textContent = "Edit"
 
         tdAction.appendChild(deleteButton);
         deleteButton.id = product.slug;
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
                  deleteProduct(el.target.id);
                }
              });
         });

         deleteButton.className = `${bgReadColor} ${productButtonClass}`;
        deleteButton.textContent = "Delete";
            // console.log(el.target.id)

        tr.appendChild(tdProductName);
        tr.appendChild(tdPrice);
        tr.appendChild(tdAction);

        productsTable.appendChild(tr);
 
     }
     // products.forEach(element => {
         
     // });
 
     //const dev = document.createElementById("div")
     // const ul = document.createElement('ul');
     // products.forEach(product => {
     // const li = document.createElement('li');
     // li.textContent = `ID: ${product.id}, Name: ${product.name}, Price: ${product.price}, Description: ${product.description}`
     // ul.appendChild(li);
     // })
     //  productsDiv.appendChild(ul);
    
     // const main = document.getElementsByTagName('main')[0];
     // main.appendChild(dev);
 
 
     // productsDiv.style.display = "block";
 }).catch((err) => {
     errorDiv.style.display = "block";
 })

 function deleteProduct(slug) {
    fetch(`http://localhost:3600/api/products/${slug}`, {
        method: "DELETE"  
    }).then(response => {
       return response.json()
    }).then ((data) => {
        Swal.fire({
            icon: "success",
            title: "Successfully DELETED!",
            text: "Product deleted from the database.",
          });
         window.location.reload()
        })
    .catch(error => {
        console.log("Could not delete the data.")
    })
 }