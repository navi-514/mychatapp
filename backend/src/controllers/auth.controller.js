import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { generateToken } from "../lib/utils.js";
import { ENV } from "../lib/env.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";


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


         res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic,
            message:'User created successfully',
             });
// Send welcome email
try{
    await sendWelcomeEmail(savedUser.email, savedUser.fullName, ENV.CLIENT_URL);

}
catch(error){
    console.error('Error sending welcome email:', error);
    }

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


export const login = async (req, res) => {
        const { email, password } = req.body;

        try{
            const user = await User.findOne({
                email
            })

            if(!user) {
                return res.status(400).json({ message: 'provide required details' });

            }
            const isPasswordMatch = await bcrypt.compare(password, user.password);

            if(!isPasswordMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
            generateToken(user._id, res);
            res.status(200).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                profilePic: user.profilePic,
                message:'Login successful',
            })
        }
            catch(error) {
                console.error('Error during login:', error);
                return res.status(500).json({ message: 'Server error' });

        }
    
};

export const logout = (_, res) => {
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:'Logout successful'});
};


export const updateProfile = async (req, res) => {

    try {
        const { profilePic } = req.body;
        if(!profilePic) 
            return res.status(400)
            .json({message:'Profile picture is required'});

            const userId = req.user._id;
            const uploadResponse = 
            await cloudinary.uploader
            .upload(profilePic)

            const updatedUser = await User.findByIdAndUpdate
            (userId,{profilePic: uploadResponse.secure_url}, {new:true});

            res.status(200).json(updatedUser);
}
    catch(error) {
        console.error('Error updating profile picture:', error);
        return res.status(500).json({ message: 'Server error' });
    }

    
};