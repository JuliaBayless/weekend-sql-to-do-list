const express = require('express');
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