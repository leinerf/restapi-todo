const express = require('express');
const router = express.Router({mergeParams: true});
const {getTodos, createTodo, getTodo, deleteTodo} = require("../helpers/todos");

router.route('/')
 .get(getTodos)
 .post(createTodo)
 
router.route('/:todo_id')
  .get(getTodo)
  .put(updateTodo)
  .delete(deleteTodo)
  
module.exports = router;