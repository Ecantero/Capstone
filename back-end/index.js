const express = require("express");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const routes = require("./routes/routes");
const cors = require("cors");
const path = require("path");

const app = express();

// var corsOp = {
//   origin: "https://localhost:4200",
// };

// const checkAuth = (req, res, next) => {
//   if (req.session.user && req.session.user.isAuthenticated) {
//     next();
//   } else {
//     res.redirect("/login");
//   }
// };

const pth = __dirname + "/views/";

app.set("views", pth);
app.use(express.static(pth));
app.use(bodyParser.json());
// app.use(cors(corsOp));

app.use((req, res, next) => {
  res.header("Allow-Control-Access-Origin", "*");
  res.header("Allow-Control-Access-Headers", "Content-Type, Authorization");
  next();
})

var urlencodedParser = bodyParser.urlencoded({
  extended: true,
});

app.use(
  expressSession({
    secret: "It'sFreeRealEstate",
    saveUninitialized: false,
    resave: false,
  })
);

app.get("/", (req, res) => {
  console.log("This message is from / call");
  res.sendFile(pth + "index.html");
  // res.json({ message: "Backend Serve is Enabled" });
});

app.post("/login", routes.checkAccess);

app.get("/about", routes.about);

app.get("/jobListings", routes.jobListings);

app.get("/search", routes.search);
app.get("/search/:name", routes.search);

app.get("/home", routes.home);

app.get("/user/:id", routes.userAcc);
app.post("/jobPost", urlencodedParser, routes.createJob);

// app.get("/edit/:id", routes.edit);
app.put("/edit/:id", routes.editEmployer);

app.get("/signUp", routes.signUp);
app.post("/signUp/emp", urlencodedParser, routes.createEmp);
app.post("/signUp/empr", routes.createEmpr);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}.`);
});
