const express = require("express");
const { Movie } = require("../models/Movie");
const router = express.Router();
const { upload } = require("../utils/multer");
const { createMovie, getAllMovies, getEditMovie } = require("../controllers/movie");
const { deleteFile } = require("../utils/delete-file");

router.get("/", (req, res) => {
    res.render("movies.ejs")
});

router.get("/add", (req, res) => {
    res.render("add-movie.ejs");
});

router.get("/get-movies", getAllMovies);
router.get("/edit/:id", getEditMovie);
router.post("/add", upload.fields([{ name: 'movie-image', mamaxCount: 1 }, { name: 'movie-video', mamaxCount: 1 }]), createMovie)
router.post("/update", upload.fields([{ name: 'movie-image', mamaxCount: 1 }, { name: 'movie-video', mamaxCount: 1 }]), async (req, res) => {
    try {
        const { title, description, genere, ratings, release_date, id, old_image, old_video } = req.body;
        let result = await Movie.findOneAndUpdate(
            { _id: id },
            { title, description, genere, ratings, release_date, image: req.files['movie-image'][0].filename ? req.files['movie-image'][0].filename : old_image, video: req.files['movie-video'][0].filename ? req.files['movie-video'][0].filename : old_video},
            { new: true }
        )

        if(req.files['movie-image'][0].filename) deleteFile(req.files['movie-image'][0].filename)
        if(req.files['movie-video'][0].filename) deleteFile(req.files['movie-video'][0].filename)

        res.cookie("msg", "update");
    } catch (error) {
        console.log("Some error occured !" + error);
    }
})
module.exports = router;