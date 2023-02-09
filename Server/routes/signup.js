const Joi = require ('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const { User } = require('../models/user');

const router = express.Router();

// create a new user

router.post("/", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(3).max(200).email().required(),
    password: Joi.string().min(6).max(200).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  // to check whether a user already exists or not

  try {
    let user = await User.findOne({ email: req.body.email });

    if(user) return res.status(400).send("User with that email already exists.....");

    const { name, email, password } = req.body

    // create a new user that doesn't already exist
    user = new User({
        name,
        email,
        password,
    });

    // hash the pw using bcrypt; 
    // generate a password with a default character of 10 per bcrypt doc and has the pw. 
    // save pw to the db and notify the client that the user has been created
    // later on, a token will be sent but a simple msg for now

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const secretKey = process.env.SECRET_KEY

    const token = jwt.sign({ _id: user._id, name: user.name, email: user.email }, secretKey);

    res.send(token);

  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

module.exports = router;

