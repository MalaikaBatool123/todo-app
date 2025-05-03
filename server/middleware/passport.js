import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import { userModel } from "../postgres/postgres.js";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/google/callback", // ✅ FIXED HERE
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;
      const picture = profile.photos[0].value;
      const name = profile.displayName;

      const user = { email };
      let User = await userModel.findOne({ where: { email } });
      if (!User) {
        User = await userModel.create({ name, email, picture });
      } 
      
      done(null, user);
    }
  )
);

export default passport;
