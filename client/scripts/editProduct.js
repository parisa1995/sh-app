const serverUrl = "http://localhost:3600/api/products";

const slug = window.location.href.split("=")[1];




const productName = document.getElementById('product_name');
const productDescription= document.getElementById('product_description');
const productPrice = document.getElementById('product_price');

//fetch one product information from the server
fetch(`${serverUrl}/${slug}`)
.then((response) => {
return response.json()
}).then((data) => {
    
    const product = data[0];
    productName.value = product.name;
    productDescription.value = product.description;
    productPrice.value = product.price;
});

function updateProduct() {
    const updatedProduct = {
      name: productName.value,
      description: productDescription.value,
      price: productPrice.value,
    };
  //update product on the server
    fetch(`${serverUrl}/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.replace(
          window.location.origin + "/pages/products/products.html"
        );
      });
  }