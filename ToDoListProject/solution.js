// import the express packages and postgres packages.
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
// express app
const app = express();
const port = 3000;
// postgres credentials..
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "todolist",
  password: "postgresql2004@",
  port: 5432,
});
db.connect();
// express middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// this is just the strucutre of the items table and it changes frequently based on the number of the items, so you can remove it and keep it empty, doesnt matter..
let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];
// here, we get the data from the databse and send it to the index.ejs file..
// we use try-catch for error-handling here..
// READ Operation
app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM items ORDER BY id ASC");
    // we select everything from the table and order it in ascending order by the id...
    items = result.rows;
    res.render("index.ejs", {
      listTitle: "Today",
      listItems: items,
    });
  } catch (err) {
    console.log(err);
  }
});
// CREATE OPERATION
// in the index.ejs, newItem will be received here. we add it to the database..
app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  // items.push({title: item});
  try {
    await db.query("INSERT INTO items (title) VALUES ($1)", [item]);
    res.redirect("/");
    // render it back to the home page..
  } catch (err) {
    console.log(err);
  }
});

app.post("/edit", async (req, res) => {
  const item = req.body.updatedItemTitle;
  const id = req.body.updatedItemId;

  try {
    await db.query("UPDATE items SET title = ($1) WHERE id = $2", [item, id]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/delete", async (req, res) => {
  const id = req.body.deleteItemId;
  try {
    await db.query("DELETE FROM items WHERE id = $1", [id]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
