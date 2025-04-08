const passport = require('passport');
const { Strategy,Profile,VerifyCallback } = require('passport-google-oauth20');
const dotenv = require('dotenv').config();
const fs = require('fs');

passport.use(
    new Strategy({
          clientID: process.env.GOOGLE_ID,
          clientSecret: process.env.GOOGLE_SECRET,
          callbackURL: process.env.GOOGLE_REDIRECT_URL,
          scope: [
            'email',
            'profile',
            'https://www.googleapis.com/auth/youtube',
            'https://www.googleapis.com/auth/youtube.force-ssl',
          ],
        },
        async (accessToken,refreshToken,profile,done) => {
          console.log(accessToken);
          //store accesstoken
          fs.writeFile("../frontend/token.json", JSON.stringify(accessToken), (writeErr) => {
            if (writeErr) {
              console.error('Error writing file:', writeErr);
              return;
            }
            console.log('Access token successfully stored');
          });
          console.log(profile);
          
          done(null, { username: profile.displayName });
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user); // Serialize the entire user object
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user); // Deserialize the entire user object
  });
