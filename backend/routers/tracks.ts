import express from 'express';
import Track from '../models/Track';
import { TrackMutation } from '../types';
import Album from '../models/Album';
import auth, { RequestWithUser } from '../middleware/auth';
import { clearTrackHistories } from '../constants';
import maybeAuth from '../middleware/maybeAuth';

const tracksRouter = express.Router();

tracksRouter.get('/', maybeAuth, async (req: RequestWithUser, res, next) => {
  try {
    const albumId = req.query.album;
    if (albumId) {
      const album = await Album.findById(albumId).populate('artist', 'name');
      const publishedTracks = await Track.find({ album: albumId, isPublished: true }).sort({ trackNumber: 1 });
      if (req.user) {
        if (req.user.role === 'admin') {
          const allAlbumsTracks = await Track.find({ album: albumId }).sort({ trackNumber: 1 });
          return res.send({ album: album, tracks: allAlbumsTracks });
        } else {
          const usersTracks = await Track.find({
            album: albumId,
            isPublished: false,
            publisher: req.user._id,
          }).sort({ trackNumber: 1 });
          return res.send({ album: album, tracks: [...publishedTracks, ...usersTracks] });
        }
      }
      return res.send({ album: album, tracks: publishedTracks });
    } else if (req.user && req.user.role === 'admin') {
      const tracks = await Track.find();
      return res.send({ album: null, tracks: tracks });
    }
    return res.status(401).send({ error: 'Unauthorized' });
  } catch (error) {
    return next(error);
  }
});

tracksRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    const trackMutation: TrackMutation = {
      title: req.body.title,
      album: req.body.album,
      time: req.body.time,
      trackNumber: req.body.trackNumber,
      publisher: req.user._id,
    };
    const track = new Track(trackMutation);
    await track.save();
    return res.send(track);
  } catch (error) {
    return next(error);
  }
});

tracksRouter.delete('/:id', auth, async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    const track = await Track.findById(req.params.id);
    if (track) {
      if (req.user.role === 'admin' || (req.user._id.toString() === track.publisher.toString() && !track.isPublished)) {
        await clearTrackHistories(track._id);
        await track.deleteOne();
        return res.send({ deleted: true });
      } else {
        return res.status(403).send({ error: 'User has not right to request!' });
      }
    } else {
      return res.status(404).send({ error: 'Track not found' });
    }
  } catch (error) {
    return next(error);
  }
});

tracksRouter.patch('/:id/togglePublished', auth, async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    if (req.user.role !== 'admin') {
      return res.status(403).send({ error: 'User has not right to request!' });
    }
    const track = await Track.findById(req.params.id);
    if (!track) {
      return res.status(404).send({ error: 'Track not found' });
    }
    await track.updateOne({ isPublished: !track.isPublished });
    return res.send({ patched: true });
  } catch (error) {
    next(error);
  }
});

export default tracksRouter;
