import express from 'express';
import mongoose from 'mongoose';
import Artist from '../models/Artist';
import { imagesUpload } from '../multer';
import { ArtistMutation } from '../types';
import auth, { RequestWithUser } from '../middleware/auth';
import { clearAlbumsAndChildren } from '../constants';
import maybeAuth from '../middleware/maybeAuth';

const artistsRouter = express.Router();

artistsRouter.get('/', maybeAuth, async (req: RequestWithUser, res, next) => {
  try {
    const publishedArtists = await Artist.find({ isPublished: true });
    if (req.user) {
      if (req.user.role === 'admin') {
        const allArtists = await Artist.find();
        return res.send(allArtists);
      } else {
        const usersArtists = await Artist.find({ isPublished: false, publisher: req.user._id });
        return res.send([...publishedArtists, ...usersArtists]);
      }
    }
    return res.send(publishedArtists);
  } catch (error) {
    return next(error);
  }
});

artistsRouter.post('/', auth, imagesUpload.single('photo'), async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    const artistMutation: ArtistMutation = {
      name: req.body.name,
      information: req.body.information,
      photo: req.file ? req.file.filename : null,
      publisher: req.user._id,
    };
    const artist = new Artist(artistMutation);
    await artist.save();
    return res.send(artist);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});
artistsRouter.delete('/:id', auth, async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    const artist = await Artist.findById(req.params.id);
    if (artist) {
      if (
        req.user.role === 'admin' ||
        (req.user._id.toString() === artist.publisher.toString() && !artist.isPublished)
      ) {
        await clearAlbumsAndChildren(artist._id);
        await artist.deleteOne();
        return res.send({ deleted: true });
      } else {
        return res.status(403).send({ error: 'User has not right to request!' });
      }
    } else {
      return res.status(404).send({ error: 'Artist not found' });
    }
  } catch (error) {
    return next(error);
  }
});

artistsRouter.patch('/:id/togglePublished', auth, async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return res.status(404).send({ error: 'Artist not found' });
    }
    await artist.updateOne({ isPublished: !artist.isPublished });
    return res.send({ patched: true });
  } catch (error) {
    next(error);
  }
});

export default artistsRouter;
