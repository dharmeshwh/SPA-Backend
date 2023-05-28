import express from "express";
import apiRoutes from "./routes";
import oauthConfig from "./configs/passport";
import passport from "passport";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";
import cors from "cors";

// Create Express app
const app = express();

// Configure cookie parser
app.use(cookieParser("CookieSecret"));

// Parse JSON bodies
app.use(express.json());

// Enable CORS with specified options
app.use(cors());

app.use(express.urlencoded({ extended: false }));

// Configure OAuth
oauthConfig();

// Configure cookie session
app.use(
  cookieSession({
    name: "google-auth-session",
    keys: ["key1", "key2"],
  })
);

// API routes
app.use("/", apiRoutes);

// Initialize passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Export the Express app

export = app;
