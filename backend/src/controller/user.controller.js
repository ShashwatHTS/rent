const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const secretKey = "Rentify"
exports.hello = (req, res) => {
    res.send('hello')
}

const cookieOptions = { httpOnly: true, secure: true, sameSite: "none" };

exports.createUser = async (req, res) => {
    try {
        const postBody = req.body
        const user = await User.findOne({ email: postBody.email })
        if (user) {
            res.json({ success: false, message: 'User already exists.', statusbar: 400 })
        }
        const newUser = await User.create(postBody)
        res.json({ success: true, message: 'User created successfully.', statusbar: 200, newUser })
    } catch (error) {
        console.log("error", error)
    }
}

exports.logIn = async (req, res) => {
    try {
        const postBody = req.body
        const user = await User.findOne({ email: postBody.email })
        if (!user) {
            res.json({ success: false, message: 'User does not exist.', statusbar: 400 })
        }
        if (user.password !== postBody.password) {
            res.json({ success: false, message: 'Password is incorrect.', statusbar: 400 })
        }
        if (user && user.password === postBody.password) {
            const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
            res.cookie("accessToken", token, cookieOptions);
            res.json({ success: true, message: 'User logged in successfully.', statusbar: 200, user ,token})
        }
    } catch (error) {
        console.log("error", error)
    }
}
