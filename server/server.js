const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000;
const toDoRouter = require ('./routes/toDoRouter.js')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

//ROUTES
app.use('/toDoRouter', toDoRouter);

//listener for port phone number
app.listen(PORT, () => {
    console.log('listening in PORT', PORT);
});