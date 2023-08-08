let express = require("express");
let app = express();
let cors = require("cors");
app.use(cors());
let dotenv = require("dotenv");
dotenv.config();
let PORT = process.env.PORT;
app.use(express.json());
let mongoose = require("mongoose");
let dbUrl = "<enter the db url to run>";
const MoviesList = require("./Schema/MovieSchema");


app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("Server started successfully " + PORT);
})

mongoose.connect(dbUrl).then(() => {
    console.log("connected to db");
})
    .catch((e) => {
        console.log("error");
    })


// API to get movies
app.get("/getmovies", async (req, res) => {
    try{
        const movies = await MoviesList.find({});
        if (movies) {
            res.status(200).send(movies);
        }
        else{
            res.status(200).send("Movies not found!");
        }
    }
    catch(e){
        res.status(500).send("Some error occurred");
    }
});

// API to get a single movie based on id.
app.get("/getsinglemovie", async (req, res) => {
    const { id } = req.body;
    try {
        const movie = await MoviesList.findOne({ _id: id });
        if (movie) {
            res.status(200).send(movie);
        }
        else{
            res.status(200).send("Movie not found!");
        }
    }
    catch (e) {
        res.status(500).send("Some error occurred");
    }
});

// API to delete a movie from database
app.delete("/deletemovie", async (req, res) => {
    const { id } = req.body;
    try {
        const movieDeleted = await MoviesList.deleteOne({ _id: id });
        if (movieDeleted.deletedCount === 1) {
            res.status(200).send("Movie deleted successfully!");
        }
        else if (movieDeleted.deletedCount === 0) {
            res.status(200).send("No movie found with entered id");
        }
    }
    catch (e) {
        res.status(500).send("Some error occurred");
    }
});

// API to update a movie from database
app.put("/updatemovie", async (req, res) => {
    const { id, title, year, description } = req.body;
    try {
        const updateMovie = await MoviesList.findOneAndUpdate(
            { _id: id }, 
            { title: title, year: year, description: description }
        );
        if (updateMovie) {
            res.status(200).send("Movie updated successfully, and the updated movie is: ");
            res.status(200).send(updateMovie);
        }
        else{
            res.status(200).send("Movie does not exists!");
        }
    }
    catch (e) {
        res.status(500).send("Some error occurred");
    }
})

// API to add movie
app.post("/addmovie", async (req, res) => {
    const { title, year, description } = req.body;
    const Movie = new MoviesList({ title: title, year: year, description: description });
    try {
        const movieAdded = await Movie.save();
        if (movieAdded) {
            res.status(200).send("New movie added successfully");
        }
    }
    catch (e) {
        res.status(500).send("Some error occured and movie not added to Database!");
    }
})

// API to get movies based on name / name search.
app.get("/searchmovie", async(req,res)=>{
    const {title}=req.body;
    try{
        const searchMovie=await MoviesList.find({title:title});
        if(searchMovie){
            res.status(200).send("Movies found:"+searchMovie);
        }
        else{
            res.status(200).send("Movies not found!");
        }
    }
    catch(e){
        res.status(500).send("Some error occurred");
    }
});