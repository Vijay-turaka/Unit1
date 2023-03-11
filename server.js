let express = require("express");
const { uuid } = require("uuidv4");
let app = express();
let fs = require("fs");
let bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/listUsers", function (req, res) {
  fs.readFile(__dirname + "/" + "userData.json", "utf8", (err, data) => {
    res.json({
      data: JSON.parse(data),
    });
  });
});

app.get("/:id", function (req, res) {
  fs.readFile(__dirname + "/" + "userData.json", "utf8", (err, data) => {
    let users = JSON.parse(data);
    let userId = req.params.id.replace(":", "");
    let user = users[`user${userId}`];
    res.json({
      data: user,
    });
  });
});

app.post("/addUser", function (req, res) {
  fs.readFile(__dirname + "/" + "userData.json", "utf8", (err, data) => {
    if (err) return console.log(err);
    let id = uuid();
    let newUser = {
      user: {
        id: id,
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        password: req.body.password,
      },
    };
    let obj = JSON.parse(data);
    obj[`user${id}`] = newUser["user"];
    result = JSON.stringify(obj);
    fs.writeFile(
      __dirname + "/" + "userData.json",
      result,
      "utf8",
      function (err) {
        if (err) return console.log(err);
      }
    );
    res.json({
      data: JSON.parse(result),
    });
  });
});

app.delete("/deleteUser", function (req, res) {
  fs.readFile(__dirname + "/" + "userData.json", "utf8", (err, data) => {
    let users = JSON.parse(data);
    delete users[`user${req.body.id}`];
    result = JSON.stringify(users);
    fs.writeFile(
      __dirname + "/" + "userData.json",
      result,
      "utf8",
      function (err) {
        if (err) return console.log(err);
      }
    );
    res.json({
      data: users,
    });
  });
});

app.listen(3000, function () {
  console.log("Example app listening on 3000 port");
});
