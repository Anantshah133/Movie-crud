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
const updateMovie = async (req, res) => {
    try {
        const { title, description, genere, ratings, release_date, id, old_image, old_video } = req.body;
        let imageFilename = old_image;
        let videoFilename = old_video;

        if (req.files['movie-image'] && req.files['movie-image'][0]) 
            imageFilename = req.files['movie-image'][0].filename;
        if (req.files['movie-video'] && req.files['movie-video'][0]) 
            videoFilename = req.files['movie-video'][0].filename;
        
        let result = await Movie.findOneAndUpdate(
            { _id: id },
            { title, description, genere, ratings, release_date, image: imageFilename, video: videoFilename },
            { new: true }
        );

        if (req.files['movie-image'] && req.files['movie-image'][0]) deleteFile(old_image);
        if (req.files['movie-video'] && req.files['movie-video'][0]) deleteFile(old_video);

        res.cookie("msg", "update");
        res.redirect("/movies");
    } catch (error) {
        console.log("Some error occurred: " + error);
        res.status(500).send("Internal Server Error");
    }
}
const deleteMovie = async (req, res)=>{
    try {
        const id = req.params.id;
        const movieObj = await Movie.findOne({_id: id});
        const result = await Movie.findByIdAndDelete(id);

        if(result) {
            deleteFile(movieObj.image);
            deleteFile(movieObj.video);
        }
        
        res.cookie("msg", "delete");
        res.redirect("/movies");
    } catch (error) {
        console.log(`Error while deleting record - ${error}`);
    }
}
module.exports = {
    getAllMovies,
    getEditMovie,
    createMovie,
    updateMovie,
    deleteMovie,
}