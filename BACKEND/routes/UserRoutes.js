const express = require('express');
const RegisterModel = require('../schemas/UserRegisterSchema');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');

let serverOtp = 0;

// Send Register OTP
router.get('/sendRegisterOtp', async (req, res) => {
    const { phonenumber } = req.query;
    if (!phonenumber) {
        return res.status(201).json({ mgs: "Enter Phonenumber for OTP" });
    } else {
        serverOtp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log('UserRoutes ', serverOtp);
        res.status(201).json({ mgs: "Otp Sent", otp: serverOtp });
    }
});

// Register
router.post('/register', async (req, res) => {
    console.log('Register payload:', req.body);
    const { username, password, confirmpassword, email, cellphone, otp } = req.body;

    if (otp !== serverOtp) {
        return res.status(201).json({ mgs: "Enter Correct OTP" });
    }
    if (password !== confirmpassword) {
        return res.status(201).json({ mgs: "Passwords don't match" });
    }
    if (!username || !password || !email || !cellphone) {
        return res.status(201).json({ mgs: "Some fields are empty" });
    }

    const existingUser = await RegisterModel.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        return res.status(201).json({ mgs: "Username or Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // hash password
    serverOtp = 0;

    const newUser = new RegisterModel({
        username,
        password: hashedPassword,
        email,
        cellphone
    });
    await newUser.save();

    return res.status(201).json({ mgs: "New User Created" });
});

// Send Login OTP
router.get('/sendLoginOtp', async (req, res) => {
    const { username, password } = req.query;

    if (!username || !password) {
        return res.status(400).json({ mgs: 'Username and password required' });
    }

    const doesUserExist = await RegisterModel.findOne({ username });
    if (doesUserExist) {
        const match = await bcrypt.compare(password, doesUserExist.password);
        if (!match) {
            return res.status(401).json({ mgs: "Incorrect password" });
        }

        serverOtp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log('UserRoutes ', serverOtp);
        return res.status(201).json({ mgs: "Enter OTP", otp: serverOtp });
    } else {
        res.status(201).json({ mgs: "User Doesn't Exist", otp: "" });
    }
});

// Login with OTP
router.get('/login', async (req, res) => {
    const { otp, username } = req.query;
    if (!otp) {
        return res.status(400).json({ mgs: "OTP required" });
    }
    if (serverOtp === otp) {
        serverOtp = 0;

        // Create JWT
        const user = await RegisterModel.findOne({ username });
         const token = jsonwebtoken.sign(
            { userId: user._id, username: user.username },
            "secretKey",
            { expiresIn: '1h' }
        );

        return res.status(201).json({ mgs: "User Authenticated", token, userId: user._id });
    } else {
        return res.status(201).json({ mgs: "Invalid OTP" });
    }
});

module.exports = router;
