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

exports.home = (req, res) => {
  //
  res.render("home", {
    title: "Home",
    config: config,
  });
};

exports.jobListings = (req, res) => {
  //
  res.render("jobListings", {
    title: "JobListings",
    config: config,
  });
};

exports.search = (res, req) => {
  //
  res.render("search", {
    title: "Search",
    config: config,
  });
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
  res.render("signUp", {
    title: "SignUp",
    config: config,
  });
};

exports.edit = (req, res) => {
  //
  User.findById(req.params.id, (err, person) => {
    if (err) return console.error(err);
    console.log("person id : " + person.name);
    console.log("allowed: " + allowed);
    if (person.name == allowed) {
      res.render("edit", {
        title: "EditProfile",
        person: person,
        config: config,
      });
    } else {
      res.redirect("/");
    }
  });
};

exports.editPerson = (req, res) => {
  //
  User.findById(req.params.id, (err, person) => {
    console.log("edit person");
    if (err) return console.error(err);
    person.name = req.body.username;
    person.age = req.body.age;
    person.email = req.body.email;
    if (req.body.password && req.body.password != "") {
      var pass = hashPassword(req.body.password);
      person.password = pass;
    }
    person.save((err, person) => {
      if (err) return console.error(err);
      console.log(req.body.username + " updated");
    });
  });
  res.redirect("/");
};

exports.delete = (req, res) => {
  //
};
