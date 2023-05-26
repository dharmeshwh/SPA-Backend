import { Request } from "express";
import passport from "passport";
import {
  Strategy as GoogleStrategy,
  VerifyCallback,
} from "passport-google-oauth2";
import dotenv from "dotenv";
import CustomValidation from "../utils/customValidation";

dotenv.config();

export = () => {
  passport.serializeUser(function (user: Express.User, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user: Express.User, done) {
    done(null, user);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: String(process.env.CLIENT_ID), // Your Credentials here.
        clientSecret: String(process.env.CLIENT_SECRET), // Your Credentials here.
        callbackURL: "http://localhost:4009/auth/callback",
        passReqToCallback: true,
      },
      async function (
        request: Request,
        _accessToken: string,
        _refreshToken: string,
        profile: any,
        done: VerifyCallback
      ) {
        try {
          const userDetails = await CustomValidation.validateGoogleUser(
            profile
          );
          request[`user`] = userDetails;
          return done(null, userDetails);
        } catch (error: Error | any) {
          console.log(`[Error] - ${error.message}`);
          throw error;
        }
      }
    )
  );
};
