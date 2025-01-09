import express from "express";
import axios from "axios";

// import the express app 
const app = express();
const port = 3000;

// use the public folder for static files as they don't get refereshed every now and then..
// express middleware
app.use(express.static("public"));

// "/" is the home page, so we need to render the index.ejs file.. for axios, use the try-catch block and add the URL of the API.. use async and await and the route we use is random. so we get random secrets based on random usernames.. the data can be tapped as a key from JS object..
app.get("/", async (req, res) => {
  try {
    const result = await axios.get("https://secrets-api.appbrewery.com/random");
    res.render("index.ejs", {
      secret: result.data.secret, // params..
      user: result.data.username, // params..
    });
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
