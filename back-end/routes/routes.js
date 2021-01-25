var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/data", { useNewUrlParser: true });
const bcrypt = require("bcrypt-nodejs");

var allowed;

var mdb = mongoose.connection;
mdb.on("error", console.error.bind(console, "connection error:"));
mdb.once("open", (callback) => {});

var employeeSchema = mongoose.Schema({
  name: String,
  age: String,
  email: String,
  password: String,
  skills: [String],
});

var Employee = mongoose.model("employee_collection", employeeSchema);

var employerSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  company: String,
});

var Employer = mongoose.model("employer_collection", employerSchema);

exports.checkAccess = (req, res) => {
  if (req.body.name == "" || req.body.password == null) {
    res.redirect("/home");
    req.session.msg = "Must enter all the appropriate information";
  }
  let userName = req.body.name;
  let userPassword = req.body.password;

  Employee.findOne({ name: userName }, (err, person) => {
    if (err) return console.error(err);
    let isPassMatch = bcrypt.compareSync(userPassword, person.password);
    if (isPassMatch) {
      req.session.user = {
        isAuthenticated: true,
        username: req.body.name,
      };
      allowed = userName;
      req.session.msg = "Succes";
      res.redirect("/home");
    } else {
      req.session.err = "No such user exists, create the account here"
      res.redirect("/signUp");
    }
  });
};

exports.home = (req, res) => {
  //
  res.render("home", {
    title: "Home",
    msg: req.session.msg,
  });
  delete req.session.msg;
};

exports.about = (req, res) => {
  res.render("about", {
    title: "About",
  });
};

exports.userAcc = (req, res) => {
  res.render("userAcc", {
    title: "User",
  });
};

exports.jobListings = (req, res) => {
  //
  res.render("jobListings", {
    title: "JobListings",
  });
};

exports.search = (res, req) => {
  //
  res.render("search", {
    title: "Search",
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
    err: req.session.err,
  });
  delete req.session.err;
};

let hashPassword = passwordStr => {
  return bcrypt.hashSync(passwordStr);
};

exports.createPerson = (req, res) => {
  var pass = hashPassword(req.body.password);
  const person = new Employee({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    password: pass,
  });
  person.save((err, person) => {
    if (err) return console.error(err);
    console.log(req.body.name + " added");
  });
  res.redirect("/home");
};

exports.edit = (req, res) => {
  //
  Employee.findById(req.params.id, (err, person) => {
    if (err) return console.error(err);
    console.log("person id : " + person.name);
    console.log("allowed: " + allowed);
    if (person.name == allowed) {
      res.render("edit", {
        title: "EditProfile",
        person: person,
      });
    } else {
      res.redirect("/");
    }
  });
};

exports.editPerson = (req, res) => {
  //
  Employee.findById(req.params.id, (err, person) => {
    console.log("edit person");
    if (err) return console.error(err);
    person.name = req.body.name;
    person.age = req.body.age;
    person.email = req.body.email;
    if (req.body.password && req.body.password != "") {
      var pass = hashPassword(req.body.password);
      person.password = pass;
    }
    person.save((err, person) => {
      if (err) return console.error(err);
      console.log(req.body.name + " updated");
    });
  });
  res.redirect("/");
};

exports.delete = (req, res) => {
  //
};
