const getDashboard = (req, res) => {
  res.render("dashboard", { user: req.session.user });
};

module.exports = {
  getDashboard,
};
