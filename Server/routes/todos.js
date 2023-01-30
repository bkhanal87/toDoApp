const { Todo } = require('../models/todo');
const express = require('express');
const Joi = require('joi');

const router = express.Router();

// endpoint to handle get request

router.get('/', async(req, res) => {
    try {
        const todos =  await Todo.find()
        .sort( {date: -1 })
        res.send(todos);
    } catch(error) {
        res.status(500).send(error.message);
        console.log(error.message);
    }
   
})

// endpoint to handle post request


router.post('/', async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(200).required(),
        author: Joi.string().min(3).max(30),
        uid: Joi.string,
        isComplete: Joi.boolean(),
        date: Joi.date()
    })

    const { error } = schema.validate(req.body)

    if(error) return res.status(400).send(error.details[0].message); //bad request from client

    const { name, author, isComplete, date, uid } = req.body

    let todo = new Todo({
        name, 
        author, 
        isComplete, 
        date, 
        uid,
    });

    // saving todo's to the database
    try {
        todo = await todo.save();
        res.send(todo);
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error.message);
    }
});

// endpoint to handle put request

router.put('/:id', async (req, res) => {

    const schema = Joi.object({
        name: Joi.string().min(3).max(200).required(),
        author: Joi.string().min(3).max(30),
        uid: Joi.string,
        isComplete: Joi.boolean(),
        date: Joi.date()
    });

    const { error } = schema.validate(req.body)

    if (error) return res.status(400).send(error.details[0].message);

    const todo = await Todo.findById(req.params.id)

    if (!todo) return res.status(404).send("Todo not found.... ");

    const { name, author, isComplete, date, uid } = req.body

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, {
            name,
            author,
            isComplete,
            date,
            uid,
        },
            { new: true }
        );

        res.send(updatedTodo);
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error.message);
    }

});

// Patch Request
// Put replaces the body of the document with a new version
// with patch, we update some data

router.patch('/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).send("Todo not found.... ");

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, {
            isComplete: !todo.isComplete
        })
        res.send(updatedTodo);
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error.message);
    }
});

// endpoint to handle delete request

router.delete("/:id", auth, async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).send("Todo not found...");

    if (todo.uid !== req.user._id)
        return res.status(401).send("Todo deletion failed. Not authorized...");

    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    res.send(deletedTodo);
});

module.exports = router;
