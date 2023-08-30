const express = require('express');
const User = require('../usermodel');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
    const { name, email, password, dob } = req.body;
    if (!name || !email || !password || !dob) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(422).json({ error: "User already exists" });
        }
        const newUser = new User({ name, email, password, dob });
        await newUser.save();
        res.status(201).json({ message: newUser });
    } catch (error) {
        res.json({ error: error })
    }

})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({ error: "Please fill all the fields" });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(422).json({ error: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        const token = await user.generateAuthToken();
        res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true
        });
        console.log(token)
        if (!isMatch) {
            return res.status(422).json({ error: "Invalid credentials" });
        } else {
            return res.status(200).json({ token: token });
        }

    } catch (error) {
        res.json({ error: error })
    }
})

router.get('/', async (req, res) => {
    const user = await User.find();
    res.send({ user: user });
})

module.exports = router;