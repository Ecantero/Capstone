const express = require("express");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const cors = require("cors");
const path = require("path");
const routes = require("./routes/routes");

const app = express();

var corsOp = {
  origin: "http://localhost:4200",
};

const pth = __dirname + "/views/";

// app.set("views", pth);
app.use(express.static(pth));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOp));

// var urlencodedParser = bodyParser.urlencoded({
//     extended: true
// });


const checkAuth = (req, res, next) => {
  if (req.session.user && req.session.user.isAuthenticated) {
    next();
  } else {
    res.redirect("/login");
  }
};

app.use(
  expressSession({
    secret: "It'sFreeRealEstate",
    saveUninitialized: true,
    resave: true,
  })
);

app.get("/", (res, req) => {
  res.sendFile(pth + "index.html");
});

app.post("/login", routes.checkAccess);

app.get("/about", routes.about);

app.get("/jobListings", routes.jobListings);

app.get("/search", routes.search);

app.get("/home",routes.home);

app.get("/user/:id",checkAuth, routes.userAcc);

app.get("/edit/:id", routes.edit);
app.post("/edit/:id", routes.editPerson);

app.get("/signUp", routes.signUp);
app.post("/signUp/emp", routes.createEmp);
app.post("/signUp/empr", routes.createEmpr);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
