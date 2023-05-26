import express, { Request, Response } from "express";
import apiRoutes from "./routes";
import oauthConfig from "./configs/passport";
import passport from "passport";
import cookieSession from "cookie-session";

const app = express();

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

// Auth
app.get(
  "/auth",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Auth Callback
app.get(
  "/auth/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/callback/failure",
  }),
  (req: Request, response: Response) => {
    response.status(200).send("yeah");
  }
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", apiRoutes);

export = app;
