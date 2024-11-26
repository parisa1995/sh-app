const serverUrl = "http://localhost:3600/api/products";

function addProduct() {
    const productName = document.getElementById('product_name');
    const productDescription = document.getElementById('product_description');
    const productPrice = document.getElementById('product_price');

    if(!productName.value || !productDescription || !productPrice ) {
        Swal.fire({
            icon: 'error',
            title: "Ooops!",
            text: 'Please enter the the require data first!'
          })
    }else {
        //send the data to the dserver
        const product = {
            name: productName.value,
            description: productDescription.value,
            price: productPrice.value,
        }
        
        // HTTP request with the data to the server
        fetch(serverUrl, {
            method: "POST",
            headers: {
                "Content-Type":'application/json;charset=utf-8'
            },
            body: JSON.stringify(product)
        }).then(response => {
            return response.json();
        }).then(data => {
            Swal.fire({
                icon: 'success',
                title: "Saved",
                text: 'Product succesfully saved into the database.'
              })
              const newPath =
              window.location.origin + "/pages/products/products.html";
              window.location.replace(newPath)
        }).catch(error => {
            console.log(error)
        })
    }
}