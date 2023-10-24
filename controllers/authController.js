const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

exports.getLogin = async (req, res, next) => {
  res.render("auth/login", {
    title: "Login",
    authError: req.flash("loginError")[0],
    validationErrors: req.flash("validationErrors"),
    isLogged: req.session.userId,
  });
};
exports.logIn = async (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    //get user
    const user = await User.findOne({ email: req.body.email });
    //check if user and correct password
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      req.flash("loginError", "incorrect email or password"); // will be added to the flash messages
      return res.render("auth/login", {
        title: "Login",
        authError: req.flash("loginError")[0], // pass the flash message to the view
        validationErrors: [],
        isLogged: false,
      });
    }

    //set session and other data that i will neet it in the frineds functions
    req.session.userId = String(user._id); // to make sure that the session is a string
    req.session.name = user.username;
    req.session.image = user.image;

    res.redirect("/");
  } else {
    req.flash("validationErrors", validationResult(req).array());
    res.redirect("/login");
  }
};

exports.getSignUp = async (req, res, next) => {
  res.render("auth/signup", {
    title: "Sign Up",
    validationErrors: req.flash("validationErrors"),
    isLogged: false,
  });
};
exports.signUp = async (req, res, next) => {
  const { username, password, email, confirmPassword } = req.body;
  if (validationResult(req).isEmpty()) {
    //1)create User
    const newUser = await User.create({
      username: username,
      password: password,
      email,
    });

    res.redirect("/login");
  } else {
    req.flash("validationErrors", validationResult(req).array());
    res.redirect("/signup");
  }
};

exports.logout = async (req, res, next) => {
  res.clearCookie("connect.sid");
  req.session.destroy(() => {
    res.redirect("/");
  });
};

//to prevent the user from type /login in the url
exports.isAuth = async (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.redirect("/login");
  }
};
exports.notAuth = async (req, res, next) => {
  if (req.session.userId) {
    res.redirect("/");
  } else {
    next();
  }
};
