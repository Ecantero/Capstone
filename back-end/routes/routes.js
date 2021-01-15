var mongoose = require("mongoose");
const config = require("../config");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/data", { useNewUrlParser: true });
const bcrypt = require("bcrypt-nodejs");

var allowed;

var mdb = mongoose.connection;
mdb.on("error", console.error.bind(console, "connection error:"));
mdb.once("open", (callback) => {});

var userSchema = mongoose.Schema({
  name: String,
  age: String,
  email: String,
  password: String,
});

var User = mongoose.model("user_collection", userSchema);

exports.checkAccess = (req, res) => {
  if (req.body.username == "" || req.body.password == null) {
    res.redirect("/login");
  }
  let userName = req.body.username;
  let userPassword = req.body.password;

  User.findOne({ name: userName }, (err, person) => {
    if (err) return console.error(err);
    let isPassMatch = bcrypt.compareSync(userPassword, person.password);
    if (isPassMatch) {
      req.session.user = {
        isAuthenticated: true,
        username: req.body.username,
      };
      allowed = userName;
      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  });
};

exports.index = (req, res) => {
  //
};

exports.login = (req, res) => {
  //
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
};

exports.signUp = (req, res) => {
  //
};

exports.edit = (req, res) => {
  //
};

exports.editPerson = (req, res) => {
  //
};

exports.delete = (req, res) => {
  //
};
