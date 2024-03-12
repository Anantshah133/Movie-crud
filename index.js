const express = require("express");
const bodyParser = require("body-parser");
require("colors");
const { PORT } = require("./src/config/config");
const connectDB = require("./db");
const movieRoute = require("./src/routes/movie");
connectDB();

const app = express();
app.set('view engine', 'ejs');
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/movies", movieRoute);

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.listen(PORT, () => {
    console.log(`Click here to open in browser : `.green + `http://localhost:${PORT}`.red.bold);
})