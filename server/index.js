const express= require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const server = express();

const productRoutes  = require("./routes/product_routes");
const usersRoutes = require("./routes/users_routes");
//const productsRouter = require("./products_router")

//server.use(bodyParser.urlencoded({extended: false}))
server.use(bodyParser.json());
server.use(cors());
server.use("/api/products", productRoutes);
server.use("/api/users", usersRoutes);


//server.use ("/v2", productsRouter);



const port = 3600;
server.listen(port, () => {
    console.log(`SEVER STARTED: http://localhost:${port}`);

})