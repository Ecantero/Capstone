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

const pth = __dirname + "/views";

app.set("views", pth);
app.use(express.static(pth));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// var urlencodedParser = bodyParser.urlencoded({
//     extended: true
// });

app.use(cors(corsOp));

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
