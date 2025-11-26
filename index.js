import express from 'express';
import Hello from './Hello.js';
import Lab5 from './Lab5/index.js';
import cors from "cors";
import db from "./Kambaz/Database/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModulesRoutes from "./Kambaz/Modules/routes.js";
import AssignmentsRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentsRoutes from "./Kambaz/Enrollments/routes.js";
import "dotenv/config";
import session from "express-session";
import mongoose from 'mongoose';

const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz";
mongoose.connect(CONNECTION_STRING);

const app = express();

// CORS configuration
app.use(cors({ 
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:3000",
})); 

// Trust proxy (needed for Render)
if (process.env.SERVER_ENV === "production") {
    app.set('trust proxy', 1);
}

// Session configuration
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.SERVER_ENV === "production",  // true in production, false in dev
        sameSite: process.env.SERVER_ENV === "production" ? "none" : "lax",  // "none" for cross-origin
        maxAge: 24 * 60 * 60 * 1000  // 24 hours
    }
};

app.use(session(sessionOptions));
app.use(express.json());

UserRoutes(app, db);
CourseRoutes(app, db);
ModulesRoutes(app, db);
AssignmentsRoutes(app, db);
EnrollmentsRoutes(app, db);
Lab5(app);
Hello(app);

app.listen(process.env.PORT || 4000, () => {
    console.log("Server running on port 4000");
});