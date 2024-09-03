import mongoose, {Types} from 'mongoose';
import Artist from './Artist';

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const artist = await Artist.findById(value);
        return Boolean(artist);
      },
      message: 'Artist does not exist',
    },
  },
  date: {
    type: String,
    required: true,
    validate: {
      validator: async (value: string) => {
        return !isNaN(Date.parse(value));
      },
      message: 'Date is invalid! enter on YYYY-MM-DD format',
    },
  },
  image: String,
});

const Album = mongoose.model('Album', AlbumSchema);

export default Album;