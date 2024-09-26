import express from 'express';
import mongoose from 'mongoose';
import Album from '../models/Album';
import {imagesUpload} from '../multer';
import {AlbumMutation} from '../types';
import auth, {RequestWithUser} from '../middleware/auth';
import Track from '../models/Track';
import Artist from '../models/Artist';

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
  try {
    const artistId = req.query.artist;
    const albums = await Album.find(artistId ? {artist: artistId} : {}).sort({date: -1});
    return res.send(albums);
  } catch (error) {
    return next(error);
  }
});

albumsRouter.get('/:id', async (req, res, next) => {
  try {
    const album = await Album.findById(req.params.id).populate('artist');
    if (album === null) {
      return res.status(404).send({error: 'Album not found'});
    }
    return res.send(album);
  } catch (error) {
    return next(error);
  }
});

albumsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({error: 'Unauthorized'});
    }
    const albumMutation: AlbumMutation = {
      title: req.body.title,
      artist: req.body.artist,
      date: parseFloat(req.body.date),
      image: req.file ? req.file.filename : null,
    };
    const album = new Album(albumMutation);
    await album.save();
    return res.send(album);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

albumsRouter.delete('/:id', auth, async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({error: 'Unauthorized'});
    }
    const album = await Album.findById(req.params.id);
    if (album) {
      if (req.user.role === 'admin' || (album.publisher === req.user._id && !album.isPublished)) {
        const tracks = await Track.find({album: album._id});
        if (tracks) {
          const trackIds: string[] = tracks.map(track => {
            return track._id.toString();
          });
          await Track.deleteMany({_id: trackIds});
        }
        await album.deleteOne();
        return res.send({deleted: true});
      } else {
        return res.status(403).send({error: 'User has not right to request!'});
      }
    } else {
      return res.status(404).send({error: 'Album not found'});
    }
  } catch (error) {
    return next(error);
  }
});

albumsRouter.patch('/:id/togglePublished', auth, async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({error: 'Unauthorized'});
    }
    if (req.user.role !== 'admin') {
      return res.status(403).send({error: 'User has not right to request!'});
    }
    const album = await Album.findById(req.params.id);
    if(!album){
      return res.status(404).send({error: 'Album not found'});
    }
    await album.updateOne({isPublished: !album.isPublished});
    return res.send({patched: true});

  }catch (error) {
    next(error);
  }
})


export default albumsRouter;