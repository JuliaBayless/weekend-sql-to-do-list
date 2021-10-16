const express = require('express');
const { parseComplete } = require('pg-protocol/dist/messages');
const router = express.Router();


const pool = require('../modules/pool');

//GET THE DATA FROM THE DB
router.get('/', (req, res) => {
    //getting the goods from SQL by stuffing command into variable
    let queryText = 'SELECT * FROM "toDoList" ORDER BY "completed";';
    pool.query(queryText)
        .then(response => {
            res.send(response.rows);
        }) //end .then
        .catch(error => {
            console.log('whoops! Error in GET from DB', error);
            //sending a call for help so the server gets a response
            res.sendStatus(500);
        }) //end .catch
}) //end GET 




//POST THE DATA FROM THE DB
router.post('/', (req, res) => {
    //packing req.body in a variable
    let newToDo = req.body;
    console.log('newToDo:', newToDo);
    //filter out those inputs 
    let queryText = `INSERT INTO "toDoList" ("task", "completed")
    VALUES($1, $2);`;

    pool.query(queryText, [newToDo.task, newToDo.completed])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('whoops! Error in POST from DB', error);
            //sending a call for help so the server gets a response
            res.sendStatus(500);
        }) //end .catch
}) //end POST






module.exports = router;