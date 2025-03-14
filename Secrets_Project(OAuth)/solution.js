// import the express packages and pg packages..
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
// import bcrypt for hashing...
import bcrypt from "bcrypt";
// import passport for authentication...
import passport from "passport";
// import strategy for passport
import { Strategy } from "passport-local";
// import google strategy for google o auth
import GoogleStrategy from "passport-google-oauth2";
import session from "express-session";
// import env for security and privacy..
import env from "dotenv";
// express app
const app = express();
const port = 3000;
const saltRounds = 10;
env.config(); // initalize the env...
// it is useful for session management..
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
// express middleware..
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// passport initialization
app.use(passport.initialize());
app.use(passport.session());
// db credentials..
const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();
// renders the home page
app.get("/", (req, res) => {
  res.render("home.ejs");
});
// renders the login page..
app.get("/login", (req, res) => {
  res.render("login.ejs");
});
// renders the register page..
app.get("/register", (req, res) => {
  res.render("register.ejs");
});
// it is used to logout 
app.get("/logout", (req, res) => {
  req.logout(function (err) {// req.logout is used for logout..
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
// it gets the secrets page..
app.get("/secrets", async (req, res) => {
  console.log(req.user);

  ////////////////UPDATED GET SECRETS ROUTE/////////////////
  if (req.isAuthenticated()) {
    try {
      const result = await db.query(
        `SELECT secret FROM users WHERE email = $1`,
        [req.user.email]
      );
      console.log(result);
      const secret = result.rows[0].secret;
      if (secret) {
        res.render("secrets.ejs", { secret: secret });
      } else {
        res.render("secrets.ejs", { secret: "Jack Bauer is my hero." });
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect("/login");
  }
});

////////////////SUBMIT GET ROUTE/////////////////
app.get("/submit", function (req, res) {
  // only if the user is authenticated, we can show the submit.ejs file or else not..
  if (req.isAuthenticated()) {
    res.render("submit.ejs");
  } else {
    res.redirect("/login");
  }
});
// it is used for google sign in...
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/secrets",
  passport.authenticate("google", {
    successRedirect: "/secrets",
    failureRedirect: "/login",
  })
);

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/secrets",
    failureRedirect: "/login",
  })
);
// this is the post request for submitting the details and saving it into the db...
app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      req.redirect("/login");
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hash]
          );
          const user = result.rows[0];
          req.login(user, (err) => {
            console.log("success");
            res.redirect("/secrets");
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});


////////////////SUBMIT POST ROUTE/////////////////
app.post("/submit", async function (req, res) {
  const submittedSecret = req.body.secret;
  console.log(req.user);
  try {
    // we update the users as we are adding new users...
    await db.query(`UPDATE users SET secret = $1 WHERE email = $2`, [
      submittedSecret,
      req.user.email, // we get the user's email...
    ]);
    res.redirect("/secrets");// render the secrets route..
  } catch (err) {
    console.log(err);
  }
});
// this is the local strategy..
passport.use(
  "local",
  new Strategy(async function verify(username, password, cb) {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            console.error("Error comparing passwords:", err);
            return cb(err);
          } else {
            if (valid) {
              return cb(null, user);
            } else {
              return cb(null, false);
            }
          }
        });
      } else {
        return cb("User not found");
      }
    } catch (err) {
      console.log(err);
    }
  })
);
// this is the google strategy.. we use the clientid and clientsecret from google auth 
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/secrets",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [
          profile.email,
        ]);
        if (result.rows.length === 0) {
          const newUser = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2)",
            [profile.email, "google"]
          );
          return cb(null, newUser.rows[0]);
        } else {
          return cb(null, result.rows[0]);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
