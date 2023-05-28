import { Request } from "express";
import passport from "passport";
import {
  Strategy as GoogleStrategy,
  VerifyCallback,
} from "passport-google-oauth2";
import dotenv from "dotenv";
import CustomValidation from "../../utils/customValidation";

dotenv.config();

export = () => {
  // Serialize user object
  passport.serializeUser(function (user: Express.User, done) {
    done(null, user);
  });

  // Deserialize user object
  passport.deserializeUser(function (user: Express.User, done) {
    done(null, user);
  });

  // Configure Google OAuth2 strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: String(process.env.CLIENT_ID),
        clientSecret: String(process.env.CLIENT_SECRET),
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
          // Validate Google user
          const userDetails = await CustomValidation.validateGoogleUser(
            profile
          );

          // Attach user details to request body
          request.body[`user`] = {
            _id: userDetails?._id,
            username: userDetails?.username,
          };

          return done(null, userDetails);
        } catch (error: Error | any) {
          throw error;
        }
      }
    )
  );
};
