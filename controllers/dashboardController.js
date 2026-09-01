const dashboardGet = (req, res) => {
  if (req.isAuthenticated())
    res.render("dashboard.ejs", {
      fullName: `${req.user.first_name} ${req.user.last_name}`,
    });
  else
    res.status(401).json({ msg: "You're not authorized to visit this page" });
};

module.exports = {
  dashboardGet,
};
