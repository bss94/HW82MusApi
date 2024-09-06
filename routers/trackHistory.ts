import express from 'express';
import User from '../models/User';
import {TrackHistoryMutation} from '../types';
import TrackHistory from '../models/TrackHistory';

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', async (req, res, next) => {
  try {
    const headerValue = req.get('Authorization');
    if (!headerValue) {
      return res.status(401).send({error: 'Header "Authorization" not found'});
    }
    const user = await User.findOne({token: headerValue});
    if (!user) {
      return res.status(401).send({error: 'Unauthorized! Wrong Token!'});
    }
    const trackHistoryMutation: TrackHistoryMutation = {
      user: user._id,
      track: req.body.track,
      datetime: new Date(),
    };
    const trackHistory = new TrackHistory(trackHistoryMutation);
    await trackHistory.save();
    return res.send(trackHistory);
  } catch (error) {
    return next(error);
  }
});

export default trackHistoryRouter;