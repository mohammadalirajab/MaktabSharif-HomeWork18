const express = require("express");
const router = express.Router();
const {
  getSignInForm,
  createUser,
  getSignUpForm,
  login,
} = require("./user.service");
const {
  signupValidation,
  signinValidation,
} = require("./middlewares/user.validation");
const { validate } = require("express-validation");

router.get(
  "/signin",
  (req, res, next) => {
    console.log(req.session.user);
    if (!req.session.user) return next();
    res.redirect("/dashboard");
  },
  getSignInForm
);
router.post("/signin", validate(signinValidation, {}, {}), login);
router.get("/signup", getSignUpForm);
router.post("/signup", validate(signupValidation, {}, {}), createUser);

module.exports = router;
