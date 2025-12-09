//const movieModel = require('../models/movieModel');

const getAllMovies = async (req, res) => {
    try {
        const years = req.query.year;
        if (years) {
            const moviesByYears = await movieModel.find({ year: { $in: years.split(',') } });
            return res.json(moviesByYears);
        }else{
            const movies = await movieModel.find();
            res.json(movies);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getMovieById = async (req, res) => {
    const id = req.params.id;
    try {
        const movie = await movieModel.findById(id);
        res.json(movie);
    } catch (error) {
        res.status(500).json({"No movie found with that ID": error.message});
    }
};

const createMovie = async (req, res) => {
    const movieData = req.body;
    console.log(movieData);
    try {
        const newMovie = await movieModel.create(movieData);
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({ "Cannot create movie": error.message });
    }
};

const deleteMovie = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedMovie = await movieModel.findByIdAndDelete(id);
        res.status(200).json(deletedMovie);
    } catch (error) {
        res.status(500).json({ "Cannot delete movie": error.message });
    }
};

const updateMovie = async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    try {
        const movie = await movieModel.findByIdAndUpdate(id, updatedData, { new: true });
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ "Cannot update movie": error.message });
    }
};

module.exports = {
    getAllMovies,
    getMovieById,
    addMovie: createMovie,
    deleteMovie,
    updateMovie
}