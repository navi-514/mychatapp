import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";


// Create Express app
const app = express();
const __dirname = path.resolve();


dotenv.config();// Load environment variables from .env file



const PORT = process.env.PORT || 3000;


app.use(express.json());//middleware to parse JSON bodies(request body)

// Define routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


//deployment ready

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend","dist","index.html"));
    })
}

// Connect to the database, then start the server
const startServer = async () => {
    try {
        await connectDB();
        const server = app.listen(PORT, () => {
            console.log('Server is running on port ' + PORT);
        });
        server.on('error', (error) => {
            console.error('Server error:', error);
            process.exit(1);
        });
    } catch (error) {
        console.error('Failed to connect to database:', error);
        process.exit(1);
    }
};

startServer();