import jwt from "jsonwebtoken";


export const generateToken = (userId, res) => {
    // Generate a JWT token with the user's ID as the payload

    const token = jwt.sign({userId},process.env.JWT_SECRET, {
        expiresIn: '30d', // Token expires in 30 days
    });

    // Set the token as an HTTP-only cookie in the response

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expires in 7 days
        httpOnly: true,
        sameSite: 'strict', // Adjust this based on your frontend and backend domains
        secure : process.env.NODE_ENV === 'development' ? false : true, // Set secure flag in production
    });
};


