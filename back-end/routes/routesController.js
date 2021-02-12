const checkAuth = (req, res, next) => {
  if (req.session.user && req.session.user.isAuthenticated) {
    next();
  } else {
    res.redirect("/login");
  }
};

module.exports = (appRoute) => {
  const routes = require("./routes");
  const router = require("express").Router();
  router.post("/login", routes.checkAccess);

  router.get("/about", routes.about);

  router.get("/jobListings", routes.jobListings);

  router.get("/search", routes.search);
  router.get("/search/:name", routes.search);

  router.get("/home", routes.home);

  router.get("/user/:id", checkAuth, routes.userAcc);

  router.get("/edit/:id", routes.edit);
  router.put("/edit/:id", routes.editEmployee);

  router.get("/signUp", routes.signUp);
  router.post("/signUp/emp", routes.createEmp);
  router.post("/signUp/empr", routes.createEmpr);

  appRoute.use("/api", router);
};
