const express = require("express");
const { Movie } = require("../models/Movie");
const router = express.Router();
const { upload } = require("../utils/multer");
const { createMovie, getAllMovies, getEditMovie, updateMovie, deleteMovie } = require("../controllers/movie");
const { deleteFile } = require("../utils/delete-file");

router.get("/", (req, res) => {
    res.render("movies.ejs")
});

router.get("/add", (req, res) => {
    res.render("add-movie.ejs");
});

router.get("/get-movies", getAllMovies);
router.get("/edit/:id", getEditMovie);
router.get("/delete/:id", deleteMovie);
router.post("/add", upload.fields([{ name: 'movie-image', mamaxCount: 1 }, { name: 'movie-video', mamaxCount: 1 }]), createMovie)
router.post("/update", upload.fields([{ name: 'movie-image', mamaxCount: 1 }, { name: 'movie-video', mamaxCount: 1 }]), updateMovie);
module.exports = router;