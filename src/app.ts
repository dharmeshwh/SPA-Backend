import express from "express";
import apiRoutes from "./routes";
import oauthConfig from "./configs/passport";
import passport from "passport";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cookieParser("CookieSecret"));

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

oauthConfig();

app.use(
  cookieSession({
    name: "google-auth-session",
    keys: ["key1", "key2"],
  })
);

app.use("/", apiRoutes);

app.use(passport.initialize());
app.use(passport.session());

export = app;
