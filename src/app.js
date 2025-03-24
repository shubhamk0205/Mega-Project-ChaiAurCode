import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
const app = express();

// Debug middleware to log all requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb"}));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import userRouter from './routes/user.routes.js'

//router declaration
app.use("/api/v1/users", userRouter)

// Error handling for 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.url} not found`
    });
});

export default app;