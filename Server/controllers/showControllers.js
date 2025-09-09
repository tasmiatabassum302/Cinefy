import axios from "axios";
import Movie from "../models/Movie.js";
import Show from "../models/Show.js";

// Now Playing Movies
export const getNowPlayingMovies = async (req, res) => {
    try {
        const { data } = await axios.get(
            'https://api.themoviedb.org/3/movie/now_playing',
            { headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` } }
    )
        res.json({ success: true, movies: data.results });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// Add Show
export const addShow = async (req, res) => {
    try {
        const { movieId, showInput, showPrice } = req.body;

        // Check if movie already exists
        let movie = await Movie.findById(movieId);

        if (!movie) {
            // Fetch movie details & credits from TMDB
            const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([
                axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
                    headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` }
                }),
                axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
                    headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` }
                })
            ]);

            const movieApiData = movieDetailsResponse.data;
            const movieCreditData = movieCreditsResponse.data;

            movie = await Movie.create({
                _id: movieId,
                title: movieApiData.title,
                overview: movieApiData.overview,
                poster_path: movieApiData.poster_path,
                backdrop_path: movieApiData.backdrop_path,
                release_date: movieApiData.release_date,
                original_language: movieApiData.original_language,
                genres: movieApiData.genres,
                casts: movieCreditData.cast.slice(0, 5),
                vote_average: movieApiData.vote_average,
                runtime: movieApiData.runtime,
                tagline: movieApiData.tagline || "",
            });
            movie= await Movie.create()
        }

        // Create shows
        const showsToCreate = [];
        showInput.forEach(show => {
            const showDate = show.date;
            show.time.forEach((time) => {
                const dateTimeString = `${showDate}T${time}`;
                showsToCreate.push({
                    movie: movieId,
                    showDateTime: new Date(dateTimeString),
                    showPrice,
                    occupiedSeats: {}
                });
            });
        });

        if (showsToCreate.length > 0) {
            await Show.insertMany(showsToCreate);
        }

        res.json({ success: true, message: "Shows added successfully" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};
export const getShows=async(req,res)=>{
    try{
        const shows=await Show.find({showDateTime:{$gte:new Date()}}).populate
        ('movie').sort({showDateTime:1});
        const uniqueShows=new Set(shows.map(show=>show.movie))
         res.json({ success: true,shows:Array.from(uniqueShows)});
    }
    catch(error){
    console.error(error);
        res.json({ success: false, message: error.message });
    }
}
export const getShow=async(req,res)=>{
    try{
        const{movieId}=res.params;
        const shows=await Show.find({movie:movieId,showDateTime:{$gte:new Date()}})
        const movie=await Movie.findById(movieId);
        const dateTime={};
        shows.forEach((show)=>{
            const date=show.showDateTime.toISOString().split("T")[0];
            if(!dateTime[date]){
                dateTime[date]=[]
            }
            dateTime[date].push({time:showDateTime, showId: show._id})

        })
        res.json({ success: true, message: error.message });
    }
    catch(error){
    console.error(error);
        res.json({ success: false, message: error.message });
    }
}