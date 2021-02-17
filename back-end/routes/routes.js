var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose
  .connect(
    "mongodb+srv://Admin:Develop33@capstone-project.zyhqb.mongodb.net/data",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connection to the database is successful");
  })
  .catch((err) => {
    console.log("Unabled to make Connection", err);
    process.exit();
  });
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

employeeSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

var Employee = mongoose.model("employee_collection", employeeSchema);

var employerSchema = mongoose.Schema({
  name: String,
  age: String,
  email: String,
  password: String,
  company: String,
});

employerSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

var Employer = mongoose.model("employer_collection", employerSchema);

var peopleSchema = mongoose.Schema({
  employee: employeeSchema,
  employer: employerSchema,
});

var People = mongoose.model("emp_empr_collection", peopleSchema);

var jobList = mongoose.Schema({
  title: String,
  desc: String,
  name: String,
});

var Jobs = mongoose.model("jobs_list_collection", jobList);

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
      req.session.err = "No such user exists, create the account here";
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

exports.search = (req, res) => {
  // const name = req.query.name;
  // var condition = name
  //   ? { name: { $regex: new RegExp(title), $options: "i" } }
  //   : {};

  Employee.find((err, person) => {
    res.send(person);
  }).catch((err) => {
    // res.status(500).send({
    //   message: err.message || "Error has occurred",
    // });
    console.log(err);
  });
  res.render("search", {
    title: "Search",
  });
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("logout successful");
      // res.redirect("/");
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

let hashPassword = (passwordStr) => {
  return bcrypt.hashSync(passwordStr);
};

exports.createEmp = (req, res) => {
  var pass = hashPassword(req.body.password);
  const employee = new Employee({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    password: pass,
    skills: req.body.skills,
  });
  employee.save((err, emp) => {
    if (err) return console.error(err);
    console.log(emp);
    console.log(req.body.name + " added");
  });
  const person = new People({
    employee: employee,
  });
  person.save((err, person) => {
    if (err) return console.error(err);
    console.log(person);
    console.log(req.body.name + " is added to the main collection");
  });
};

exports.createEmpr = (req, res) => {
  var pass = hashPassword(req.body.password);
  const employer = new Employer({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    password: pass,
    company: req.body.company,
  });
  employer.save((err, person) => {
    if (err) return console.error(err);
    console.log(req.body.name + " added");
  });
  const person = new People({
    employer: employer,
  });
  person.save((err, person) => {
    if (err) return console.error(err);
    console.log(person);
    console.log(req.body.name + " is added to the main collection");
  });
};

exports.createJob = (req, res) => {
  const job = new Jobs({
    title: req.body.title,
    desc: req.body.desc,
    name: req.body.name
  });
  job.save((err, jobPost) => {
    if (err) return console.error(err);
    console.log(req.body.name + " added");
  });
}

exports.findUser = (req, res) => {
  const id = req.params.id;

  People.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Unable to find user with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving user with id=" + id });
    });
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

exports.editEmployee = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Employee.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Employee with id=${id}.`,
        });
      } else res.send({ message: "Employee was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Employee with id=" + id,
      });
    });
  //
  // res.redirect("/");
};

exports.delete = (req, res) => {
  //
};
