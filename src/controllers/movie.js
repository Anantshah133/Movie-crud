const { Movie } = require("../models/Movie");
const { deleteFile } = require("../utils/delete-file");

const createMovie = async (req, res) => {
    try {
        const { title, description, genere, ratings, release_date } = req.body;
        let image = req.files['movie-image'][0].filename;
        let video = req.files['movie-video'][0].filename;

        const movie = await Movie.create({
            title,
            description,
            genere,
            image,
            video,
            ratings,
            release_date,
        })
    } catch (error) {
        console.log(`Error in inserting movie : ${error}`)
    }
    res.cookie("msg", "insert");
    res.redirect("/movies");
}
const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.status(201).send(movies);
    } catch (error) {
        console.log(`Error while fetching Movies :- ${error}`);
    }
}
const getEditMovie = async (req, res) => {
    const id = req.params.id;
    const movie = await Movie.findOne({ _id: id });
    res.render("edit-movie.ejs", { movie, mode: 'edit' });
}

module.exports = {
    createMovie,
    getAllMovies,
    getEditMovie,
}