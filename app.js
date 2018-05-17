var express = require('express');
var todoController = require('./controllers/ToDoController');
var app = express();

//Template Engine EJS
app.set('view engine', 'ejs');

//Static Files
app.use(express.static('./public'));

//Activate controllers
todoController(app);

//Listen to Port
app.listen(3000);
console.log('Listening at port 3000');