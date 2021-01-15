const express = require("express");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const cors = require("cors");
const path = require("path");
const routes = require("./routes/routes");

const app = express();

var corsOp = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOp));








