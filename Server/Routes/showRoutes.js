import express from "express";
import { getNowPlayingMovies,addShow } from "../controllers/showControllers.js";

const showRouter = express.Router();

showRouter.get('/now_playing', getNowPlayingMovies);
showRouter.post('/add', addShow)
//res.json({ message: "POST works!", data: req.body });

export default showRouter;