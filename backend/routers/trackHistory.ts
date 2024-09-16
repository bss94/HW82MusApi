import express from 'express';
import User from '../models/User';
import {TrackHistoryMutation} from '../types';
import TrackHistory from '../models/TrackHistory';
import auth, {RequestWithUser} from '../middleware/auth';
import mongoose from 'mongoose';

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', auth,async (req:RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({error: 'User not found'});
    }
    // if(!req.body.track){
    //   return res.status(401).send({error: 'Track are required'});
    // }

    const trackHistoryMutation: TrackHistoryMutation = {
      user: req.user._id,
      track: req.body.track,
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

export default trackHistoryRouter;