const express = require('express');
const app = express(); //invoking express here
const mongoose = require('mongoose');

require('dotenv').config()



// create an api endpoint to later get data from the database
app.get('/', (req, res) => {
    res.send('welcome to our todos api.....');
});

const connection_string = process.env.CONNECTION_STRING

// connecting to the port
// this will later be replaced with an environmental variable
app.listen(5000, () => {
    console.log('server running on port 5000');
});

mongoose.connect(connection_string, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connection established'))
.catch((error) => console.error('MongoDB connection failed:', error.message))