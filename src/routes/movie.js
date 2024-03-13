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
        let imageFilename = old_image;
        let videoFilename = old_video;

        if (req.files['movie-image'] && req.files['movie-image'][0]) {
            console.log("New image uploaded:", req.files['movie-image'][0].filename);
            imageFilename = req.files['movie-image'][0].filename;
        }
        if (req.files['movie-video'] && req.files['movie-video'][0]) {
            console.log("New video uploaded:", req.files['movie-video'][0].filename);
            videoFilename = req.files['movie-video'][0].filename;
        }

        // console.log("Deleting old image:", old_image);
        // console.log("Deleting old video:", old_video);

        let result = await Movie.findOneAndUpdate(
            { _id: id },
            { title, description, genere, ratings, release_date, image: imageFilename, video: videoFilename },
            { new: true }
        );

        if (req.files['movie-image'] && req.files['movie-image'][0]) {
            console.log("Called");
            deleteFile(old_image);
        }
        if (req.files['movie-video'] && req.files['movie-video'][0]) {
            deleteFile(old_video);
        }

        res.cookie("msg", "update");
        res.redirect("/movies");
    } catch (error) {
        console.log("Some error occurred: " + error);
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router;