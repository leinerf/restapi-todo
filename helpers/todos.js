var db = require('../models');

module.exports.getTodos =  async function(req, res){
    try {
        let todos = db.Todo.find({user: req.params.user_id})
        return res.status(200).json({todos: todos})
    } catch(err) {
        return next({
            status: 400,
            message: err.message
        });
    }
}

exports.createTodo = async function(req, res){
    try {
        let newTodo = await db.Todo.create({name: req.body.name, user: req.params.user_id})
        return res.status(201).json(newTodo);
    } 
    catch(err) {
        return next({
            status: 400,
            message: err.message
        });
    }
}

module.exports.getTodo = async function(req, res){
   try {
       let foundTodo = await db.Todo.findById(req.params.todo_id);
       return res.status(200).json(foundTodo);
   } catch(err) {
        return next({
            status: 400,
            message: err.message
        });
   }  
}

module.exports.updateTodo =  async function(req, res){
   try {
       let updatedTodo = await db.Todo.findOneAndUpdate({_id: req.params.todo_id}, req.body, {new: true})
       return res.status(200).json(updatedTodo);
   }
   catch(err){
        return next({
            status: 400,
            message: err.message
        });
   }
}

module.exports.deleteTodo = function(req, res){
   try{
        let foundTodo = await db.Todo.find({_id: req.params.todo_id});
        await foundTodo.remove();
        res.status(200).json(foundTodo);
   } catch(err) {
        return next({
            status: 400,
            message: err.message
        });
   }
    
   
}