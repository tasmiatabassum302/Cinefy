import express from "express";
import { getNowPlayingMovies,addShow, getShows, getShow } from "../controllers/showControllers.js";
import { protectAdmin } from "../middleware/auth.js";

const showRouter = express.Router();

showRouter.get('/now_playing',protectAdmin, getNowPlayingMovies);
showRouter.post('/add',protectAdmin, addShow)
showRouter.get('/all',getShows);
showRouter.get('/all',getShow);
showRouter.post('/add',(req, res) =>
{
  res.json({ message: "POST works!", data: req.body });
});


export default showRouter;