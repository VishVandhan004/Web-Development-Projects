// this is a capstone project. It asks you to type a password in the HTML Form. After you type the correct password, it will redirect you to a different HTML Page and show some info. we need to use express.js to do this. the correct password is ILoveProgramming

// importing express..
import express from "express";
// importing body-parser middleware.
import bodyParser from "body-parser";
// importing dirname and fileurltopath to send the HTML file to the server.
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

// creating app and setting up port
const app = express();
const port = 3000;

// variable to check if the user has typed correct pwd or not..
var userIsAuthorised = false;

// body-parser middleware.
app.use(bodyParser.urlencoded({ extended: true }));
// user-defined middleware
function passwordCheck(req, res, next) {
  const password = req.body["password"];
  if (password === "ILoveProgramming") {
    userIsAuthorised = true;
  }
  next();
}
app.use(passwordCheck);

// route handling...
// GET route to home page sends the index.html file 
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// After user has typed the pwd in the form, the data will be submitted to the /check route using POST method.
app.post("/check", (req, res) => {
  if (userIsAuthorised) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.sendFile(__dirname + "/public/index.html");
    // Alternatively res.redirect("/"); is used to simply redirect to home page if pwd is wrong..
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
