import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
    try {
        const { name, email, password, mobile, role } = req.body;
        const exitingUser = await User.findOne({ email });
        if (exitingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        const hasPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hasPassword,
            mobile,
            role: role === "admin" ? "admin" : "user"
        });
        res.status(201).json({ msg: "SignUp Successfully" }, user)
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid Credential" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid Credential" })
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRATION_TIME });
        res.status(200).json({
            msg: "Login Successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                role: user.role
            }
        })
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}