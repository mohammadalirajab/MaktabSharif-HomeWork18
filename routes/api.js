const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.redirect("/auth/signin"));
router.get("/logout", (req, res) => {
  req.session.user = undefined;
  res.redirect("/auth/signin");
});
router.use("/auth", require("./user/user.controller"));
router.use(
  "/dashboard",
  (req, res, next) => {
    if (req.session.user) return next();
    res.redirect("/auth/signin");
  },
  require("./dashboard/dashboard.controller")
);

module.exports = router;
