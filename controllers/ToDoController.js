var data = [{item: 'Ensayar con metronomo'},{item: 'Comprar headphone preamp'},{item: 'Comprar Pedales'}];
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connecting to database
mongoose.connect('mongodb://test:test@ds257495.mlab.com:57495/todolisttest');

//Creating a schema (what mongoDB expects from the data)
var todoSchema= new mongoose.Schema({
    item: String
});

// Creating a variable with todoSchema model
var Todo = mongoose.model('Todo', todoSchema);

//Using bodyparser to create a middleware to parse the body of the request in js object form in post method
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){

app.get('/todo', function(req,res){
    //get data from Mongodb and pass it to view
    Todo.find({},function(err,data){
        if (err) throw err;
        res.render('todo', {list : data});
    });
});

app.post('/todo', urlencodedParser, function(req,res){
    //get data from the view and pass it to the database
    var newTodo = Todo(req.body).save(function(err,data){
        if (err) throw err;
        res.json(data);
    });
});

app.delete('/todo/:item', function(req,res){
    //Delete item from mongodb
    Todo.find({item : req.params.item.replace(/\-/g," ")}).remove(function(err,data){
        if (err) throw err;
        res.json(data);
    });
});
};