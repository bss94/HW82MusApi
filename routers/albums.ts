import express from 'express';
import mongoose from 'mongoose';
import Album from '../models/Album';
import {imagesUpload} from '../multer';
import {AlbumMutation} from '../types';

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
  try {
    const artistId = req.query.artist;
    const albums = await Album.find(artistId ? {artist: artistId} : {});
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

albumsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const albumMutation: AlbumMutation = {
      title: req.body.title,
      artist: req.body.artist,
      date: !isNaN(Date.parse(req.body.date)) ? new Date(req.body.date).toISOString() : req.body.date,
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


export default albumsRouter;