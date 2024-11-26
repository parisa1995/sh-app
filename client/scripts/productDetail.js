

    //SELECT HTML ELEMENTS
    const productNameEl = document.getElementById('product-name');
    const productPriceEl = document.getElementById('product-price');
    const productDescriptionEL = document.getElementById('product-description');

        let splitedUrl = document.location.href.split("=");
        const serverUrl = `http://localhost:3600/api/products/${splitedUrl[1]}`;
        fetch(serverUrl)
        .then((response) => {
            return response.json();
        }).then((productDetail) =>{
            const product = productDetail[0];
            productNameEl.textContent = product.name;
            productPriceEl.textContent = " $" + product.price;
            productDescriptionEL.textContent = product.description;
            //alert(`${product.name} ${product.price}`);
        })
   