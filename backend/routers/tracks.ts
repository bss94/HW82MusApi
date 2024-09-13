import express from 'express';
import Track from '../models/Track';
import {TrackMutation} from '../types';
import Album from '../models/Album';

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
  try {
    const albumId = req.query.album;
    if (albumId !== undefined) {
      const album = await Album.findById(albumId).populate('artist', 'name');
      const tracks = await Track.find({album: albumId}).sort({trackNumber: 1});
      return res.send({album: album, tracks: tracks});
    }
    const tracks = await Track.find();
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
      trackNumber: req.body.trackNumber
    };
    const track = new Track(trackMutation);
    await track.save();
    return res.send(track);
  } catch (error) {
    return next(error);
  }
});


export default tracksRouter;