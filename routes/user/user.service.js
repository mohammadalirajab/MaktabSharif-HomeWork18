const path = require("path");
const User = require(path.join(__dirname, "../../database/models/user.model"));

const getSignInForm = (req, res) => {
  res.render("signin", { error: null, successful: false });
};

const getSignUpForm = (req, res) => {
  res.render("signup", { error: null, successful: false });
};

const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.render("signup", { error: null, successful: true });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.render("signup", { error: "User already exists." });
    }
    res.render("signup", { error: "Internal server error." });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const targetUser = await User.find({ username, password });
    if (!targetUser) {
      return res.render("signin", {
        error: "User does not exist with this information.",
        successful: false,
      });
    }
    req.session.user = targetUser;
    res.render("signin", {
      error: null,
      successful: true,
    });
  } catch (error) {}
};

module.exports = {
  getSignInForm,
  createUser,
  getSignUpForm,
  login,
};
