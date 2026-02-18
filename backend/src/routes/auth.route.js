import express from "express";

import { signup } from "../controllers/auth.controller.js";

// src/routes/auth.route.js
const router = express.Router();

router.post('/signup',signup);

router.get('/login', (req, res) => {
    res.send({ message: 'Login endpoint' });
}); 

router.get('/logout', (req, res) => {
    res.send({ message: 'Logout endpoint' });
});


export default router;