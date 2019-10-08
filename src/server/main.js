import express from 'express';
import session from "express-session";
import middleware from './middleware';
import path from 'path';
import api from './api';
import bodyParser from "body-parser";
import {
  db,
  User
} from './db'
import passport from 'passport'
import {
  comparePassword
} from './util'
import {
  Strategy as LocalStrategy
} from "passport-local";


const app = express();

const strategy = new LocalStrategy(async (email, password, done) => {
  const user = await User.findOne({
    email
  });
  if (user && (await comparePassword(password, user.passwordHash))) {
    done(null, user);
  } else {
    done(null, null, {
      message: AUTH_ERROR_MESSAGE
    });
  }
});

passport.use("local", strategy);
passport.serializeUser(async (user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  const user = await User.findById(_id);
  if (user) {
    done(null, user);
  } else {
    done(null, null, {
      message: "User not found."
    });
  }
});

app.use(
  session({
    secret: "Secret",
    resave: false,
    saveUninitialized: false
  })
);
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());


app.use('/dist', express.static(path.join(__dirname, '..', 'client')));

app.get('/*', middleware);

app.use("/api", api(db));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});