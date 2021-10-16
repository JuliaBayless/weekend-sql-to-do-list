const express = require('express');
const { parseComplete } = require('pg-protocol/dist/messages');
const router = express.Router();
const pool = require('../modules/pool');



//GET THE DATA FROM THE DB
router.get('/', (req, res) => {
    //getting the goods from SQL by stuffing command into variable
    let queryText = 'SELECT * FROM "toDoList" ORDER BY "deadline";';
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
    let queryText = `INSERT INTO "toDoList" ("task", "deadline")
    VALUES($1, $2);`;

    pool.query(queryText, [newToDo.task, newToDo.deadline])
        .then(result => {
            res.sendStatus(201);
        }) //end .then
        .catch(error => {
            console.log('whoops! Error in POST from DB', error);
            //sending a call for help so the server gets a response
            res.sendStatus(500);
        }) //end .catch
}); //end POST



//PUT 
router.put('/:id', (req, res) => {
    let id = req.params.id;
    let completed = req.body.completed;

    //check the data coming through the variables
    console.log('In PUT', id, completed);

    let queryText = '';
    //condition goes here!
    if (completed === 'Completed') {
        //sql command
        queryText = `
            UPDATE "toDoList"
            SET "completed" = true
            WHERE "id" = $1
          `
    }
    let value = [id]
    pool.query(queryText, value)
        .then(result => {
            res.sendStatus(200);
        }) //end .then
        .catch(error => {
            console.log('whoops! Error in PUT from DB', error);
            //sending a call for help so the server gets a response
            res.sendStatus(500);
        }) //end .catch
}); //end PUT



//SERVER SIDE DELETE
router.delete('/:id', (req, res) => {
    //packing data in a variable
    let id = req.params.id;
    console.log('DELETING:', id);

    //sql command
    let queryText = `
    DELETE FROM "toDoList"
    WHERE "id" = $1;
    `
    let value = [id];

    pool.query(queryText, value)
        .then(result => {
            res.sendStatus(204);
        }) //end .then
        .catch(error => {
            console.log('whoops! Error in DELETE from DB', error);
            //sending a call for help so the server gets a response
            res.sendStatus(500);
        }) //end .catch
}) //end DELETE


module.exports = router;