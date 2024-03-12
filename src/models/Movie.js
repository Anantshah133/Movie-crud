const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    ratings: {
        type: String,
        required: true,
    },
    genere: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    video: {
        type: String,
    },
    release_date: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Movie = mongoose.model("movies", movieSchema);
module.exports = {
    Movie
}