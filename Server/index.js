const todos = require('./routes/todos');
const signup = require('./routes/signup');
const signin = require('./routes/signin');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// import { Todo } from './models/todo.js';

require('dotenv').config();

const app = express(); //invoking express here

app.use(cors()) // cors - a middleware function used here to add functionalities to our application; has access to request, response, and next and 
// can add function to other middleware

app.use(express.json()) // another middleware function used to pass json in the body of the request

app.use('/api/todos', todos);

app.use('/api/signup', signup);

app.use('/api/signin', signin);


// create an api endpoint to later get data from the database
app.get('/', (req, res) => {
    res.send('welcome to our todos api.....');
});

const connection_string = process.env.CONNECTION_STRING
const port = process.env.PORT || 5000

// connecting to the port
// this will later be replaced with an environmental variable
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});

mongoose.connect(connection_string, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connection established'))
.catch((error) => console.error('MongoDB connection failed:', error.message));