import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import passport from "passport";
import { User } from "../model";

require("dotenv").config({ path: ".env.local" });

const CALLBACK_URL = "http://localhost:4000/api/auth/google/callback";

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "180779742840-f71ob1hfe3t3uhotv75sbv15hcnhbph2.apps.googleusercontent.com",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: CALLBACK_URL,
      passReqToCallback: true,
    },
    async function (
      request: any,
      accessToken: any,
      refreshToken: any,
      profile: {
        displayName: any;
        email: any;
      },
      done: (arg0: null, arg1: User) => void
    ) {
      const user = await User.findOne({
        where: {
          email: profile.email,
        },
      });

      if (user) {
        return done(null, user);
      }

      const newUser = await User.create({
        username: profile.displayName,
        email: profile.email,
        password: "",
        refreshToken: "",
      });

      return done(null, newUser);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user!);
});

export default passport;
