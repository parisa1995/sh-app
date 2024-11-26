const express = require('express');
const knex = require('../db/db');
const { v4: uuidv4 } = require("uuid");

const router = express.Router();
const usersTable = "users";



router.get("/", (req, res) => {
    knex(usersTable).then(data => {
     res.json(data)
    })
 })


//  router.post("/", (req, res)  =>{
//     const {first_name, last_name, email} = req.body;
//     const usersData = {uuid: uuidv4(), first_name, last_name, email};

//     knex(usersTable).insert(usersData).then(data => {
//         console.log(data);
//         res.send("Data saved.")
//     })
//  })

router.post("/", (req, res) => {
    const { first_name, last_name, email } = req.body;
  
    const newUser = {
      uuid: uuidv4(), first_name, last_name, email};
  
    knex(usersTable)
      .insert(newUser)
      .then((recordId) => {
        console.log(recordId);
        res.send(`User successfully saved.\n Saved user id is : ${recordId[0]}`);
      });
  });

  router.get("/:uuid", (req, res) => {
    const uuid = req.params.uuid;

    knex(usersTable).where("uuid", uuid).then(data => {
        res.json({
            status: "OK",
            stausCode: 200,
            data: data
        })
    });
  });

  router.put("/:uuid", (req, res) => {
    const uuid = req.params.uuid;

    const {first_name, last_name, email} = req.body;
    const newUserData = {first_name, last_name, email}

    knex(usersTable).where("uuid", uuid).update(newUserData).then(data => {
        res.json({
            status: "OK",
            statusCode: 200,
            data: data
        })
    })
  });

  //Delete

  router.delete("/:uuid", (req, res) =>{
    const uuid = req.params.uuid;
    knex(usersTable).where('uuid', uuid).delete().then(data =>{
        res.json ({
            status: "OK",
            statusCode: 200,
            data: data
        })
    })
  });
  

 module.exports = router;