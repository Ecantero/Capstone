const express = require("express");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const cors = require("cors");
const path = require("path");

const app = express();

var corsOp = {
  origin: "https://localhost:4200",
};

const pth = __dirname + "/views/";

app.set("views", pth);
app.use(express.static(pth));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOp));

// var urlencodedParser = bodyParser.urlencoded({
//     extended: true
// });

app.use(
  expressSession({
    secret: "It'sFreeRealEstate",
    saveUninitialized: true,
    resave: true,
  })
);

app.get("/", (req, res) => {
  res.sendFile(pth + "index.html");
  // res.json({ message: "Backend Serve is Enabled" });
});

require("./routes/routesController")(app)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}.`);
});
