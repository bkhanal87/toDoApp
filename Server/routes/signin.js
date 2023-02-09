const Joi = require ('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const express = require('express');
const { User } = require('../models/user');

const router = express.Router();

router.post('/', async (req, res) => {
    const schema = Joi.object({
        email: Joi.string().min(3).max(200).email().required(),
        password: Joi.string().min(6).max(200).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    // user exists ??

    try {
        let user =  await User.findOne ({ email: req.body.email });

        if(!user) return res.status(400).send("Invalid email or password");

        // compare the inputted pw with the pw stored in the db

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if(!validPassword) return res.status(400).send("Invalid email or password");

        // log in client and validate their identity generating a token; the "sign" method gets the payload and the secret key as arguments and sends the token to the client

        const secretKey = process.env.SECRET_KEY

        const token = jwt.sign({ _id: user._id, name: user.name, email: user.email }, secretKey);

        res.send(token);

    } catch (error) {
        res.status(500).send(error.message);
        console.log(error.message);
    }
});

module.exports = router;
