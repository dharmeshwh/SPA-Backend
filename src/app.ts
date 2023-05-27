import express from "express";
import apiRoutes from "./routes";
import oauthConfig from "./configs/passport";
import passport from "passport";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser("CookieSecret"));

app.use(express.json());

oauthConfig();

app.use(
  cookieSession({
    name: "google-auth-session",
    keys: ["key1", "key2"],
  })
);

app.get("/", (req, res) => {
  res.send("<button><a href='/auth'>Login With Google</a></button>");
});
app.use("/", apiRoutes);

app.use(passport.initialize());
app.use(passport.session());

export = app;
