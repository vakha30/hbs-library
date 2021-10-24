const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");

const PORT = process.env.PORT || 5000;
const dbUrl = "mongodb+srv://gvardeez95:stalker95@products.yiuz2.mongodb.net/hbs_books_cump_db";

const app = express();

app.engine("hbs", exphbs({ extname: "hbs" }));
app.set("view engine", "hbs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));
app.use(require("./routes"));

const start = async () => {
  await mongoose.connect(dbUrl);

  app.listen(PORT, () => {
    console.log("Server has been started on port", PORT);
  });
};

start();
