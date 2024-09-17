import express from 'express';
import {TrackHistoryMutation} from '../types';
import TrackHistory from '../models/TrackHistory';
import auth, {RequestWithUser} from '../middleware/auth';
import mongoose from 'mongoose';
import Track from '../models/Track';
import Album from '../models/Album';
import Artist from '../models/Artist';

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({error: 'User not found'});
    }
    const track = await Track.findById(req.body.track);
    if (!track) {
      return res.status(401).send({error: 'Track not found'});
    }
    const album = await Album.findById(track.album._id);
    if (!album) {
      return res.status(401).send({error: 'Album not found'});
    }
    const artist = await Artist.findById(album.artist);
    if (!artist) {
      return res.status(401).send({error: 'Artist not found'});
    }
    const trackHistoryMutation: TrackHistoryMutation = {
      user: req.user._id,
      track: req.body.track,
      artist: artist._id,
      datetime: new Date(),
    };
    const trackHistory = new TrackHistory(trackHistoryMutation);
    await trackHistory.save();
    return res.send(trackHistory);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});
trackHistoryRouter.get('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({error: 'User not found'});
    }
    const trackHistory = await TrackHistory.find({user: req.user._id})
      .populate('track', 'title')
      .populate('artist', 'name')
      .sort({datetime: -1});
    return res.send(trackHistory);
  } catch (error) {
    return next(error);
  }
});

export default trackHistoryRouter;