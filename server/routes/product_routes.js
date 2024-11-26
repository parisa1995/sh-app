const express = require('express');
const slug =  require('slug')
const router = express.Router();
const knex = require("../db/db")

//APIS 
router.get("/", (req, res) =>{ 
    knex("products")
    //.select("id", "name")
    //.where("id", 2)
        .then((data) =>{
        // data.forEach((product) =>{
        //     console.log(product.name)
        // });
        res.json(data);
    });
    // res.send("HELLO")
});
router.post("/", (req, res) =>{
    //const clientData = req.body;

    const {name, description, price} = req.body;
    const clientData = { slug: slug(name), name, description, price}

    knex('products')
    .insert(clientData)
    .then(data =>{
    res.json({
        status: "OK",
        stautsCode: 200,
        message: `Product is store into the database, and product id is: ${data[0]}`,
    })
   })  
});
router.get('/:slug', (req, res) =>{
    const slug = req.params.slug;
    knex('products').where("slug", slug).then(data =>{
        res.json(data);
    }); 
})


router.put("/:slug", (req, res) =>{
    const slug = req.params.slug;

    const clientData = req.body;

   //find the data you(client) want to update, in the database
    knex("products").where("slug", slug).update(clientData).then(data =>{
        if(data === 1 ) {
            res.json ({
                status: "OK",
                stautsCode: 200,
                message: "Updated the data"
            })
        } else {
            res.json({
                status: "Not Found",
                stautsCode: "400",
                message: "Could not found the data to update."
            })
        }
    })
   //ORM -- to update the database
});

router.delete("/:slug", (req, res) =>{
    const slug = req.params.slug;

    knex("products").where("slug", slug).delete().then(data =>{
        if(data === 1) {
            res.json({
                message: "Successfully deleted the data."
            })
        } else {
            message: "Could not delete the data."
        }
    })
})



// server.get("/api/v2/products", (req, res) => {
//     const products = [
//         {
//             id: 1,
//             name: "Laptop",
//             price: 1200.99,
//             category: "Electronics",
//             inStock: true
//         },
//         {
//             id: 2,
//             name: "Smartphone",
//             price: 799.99,
//             category: "Electronics",
//             inStock: true
//         },
//         {
//             id: 3,
//             name: "desk-chair",
//             price: 150.00,
//             category: "Furniture",
//             inStock: false
//         },
//         {
//             id: 4,
//             name: "Wireless Mouse",
//             price: 25.99,
//             category: "Accessories",
//             inStock: true
//         },
//         {
//             id: 5,
//             name: "Coffee Maker",
//             price: 89.99,
//             category: "Appliances",
//             inStock: true
//         },
//         {
//             id: 6,
//             name: "Headphones",
//             price: 199.99,
//             category: "Electronics",
//             inStock: true
//         },
//         {
//             id: 7,
//             name: "Bookshelf",
//             price: 85.50,
//             category: "Furniture",
//             inStock: false
//         },
//         {
//             id: 8,
//             name: "Blender",
//             price: 60.75,
//             category: "Appliances",
//             inStock: true
//         },
//         {
//             id: 9,
//             name: "Keyboard",
//             price: 49.99,
//             category: "Accessories",
//             inStock: true
//         },
//         {
//             id: 10,
//             name: "Running Shoes",
//             price: 120.00,
//             category: "Clothing",
//             inStock: true
//         }
//     ];
//     res.json(products)
//  });

module.exports = router;