import { generateToken } from "../lib/utils.js";

import User from "../models/User.js";
import bcrypt from "bcryptjs";


// src/controllers/auth.controller.js
export const signup =  async(req, res) => {
    const {fullName, email, password} = req.body;
// Basic validation
    try {   
        if(!fullName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
// Validate password length
        if(password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long' });
        }
// Regular expression to validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400)
            .json({message:'Invalid email format'});

        }
// Check if the email already exists in the database
        const user = await User.findOne({ email });


            if(user) {
                return res.status(400).json({ message: 'Email already exists' });
            }
    
// Hash the password before saving to the database

    const salt =  await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        fullName,
        email,
        password: hashedPassword,
    });
    // Generate a JWT token and set it as an HTTP-only cookie in the response
    if(newUser) {
        //generateToken(newUser._id, res);
       // await newUser.save();

        const savedUser = await newUser.save();
        generateToken(savedUser._id, res);


        return res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic,
            message:'User created successfully', user: newUser});
    }
    else{
        return res.status (400).json({message:'Failed to create user'});
    }
}
    catch (error) {
        console.error('Error during signup:', error);
        return res.status(500).json({ message: 'Server error' });
    }      
        
};