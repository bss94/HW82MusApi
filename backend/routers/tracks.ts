import express from 'express';
import Track from '../models/Track';
import {TrackMutation} from '../types';

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
  try {
    const albumId = req.query.album;
    const tracks = await Track.find(albumId ? {album: albumId} : {});
    return res.send(tracks);
  } catch (error) {
    return next(error);
  }
});

tracksRouter.post('/', async (req, res, next) => {
  try {
    const trackMutation: TrackMutation = {
      title: req.body.title,
      album: req.body.album,
      time: req.body.time,
      trackNumber:req.body.trackNumber
    };
    const track = new Track(trackMutation);
    await track.save();
    return res.send(track);
  } catch (error) {
    return next(error);
  }
});


export default tracksRouter;