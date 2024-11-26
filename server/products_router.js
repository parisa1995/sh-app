const express = require("express");

const router = express.Router();

router.get("/products", (req, res) => {
    res.send("Hello from Products routes")
})



module.exports = router;

