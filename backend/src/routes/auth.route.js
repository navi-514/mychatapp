import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";

import { login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

// src/routes/auth.route.js
const router = express.Router();

router.use(arcjetProtection); // Apply Arcjet protection to all routes in this router

router.post('/signup', signup);

router.post('/login', login); 

router.post('/logout', logout);

router.put("/update-profile-pic", protectRoute, updateProfile);


router.get("/check", protectRoute, (req, res) => {
    res.status(200).json({message:'Authenticated', user: req.user})
}






























    
)


export default router;