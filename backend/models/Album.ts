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
    type: Number,
    required: true,
    validate: {
      validator: async (value: number) => {
        return value > 1900;
      },
      message: 'Date is invalid! entered value must be bigger than 1900',
    },
  },
  image: String,
  // publisher:{
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true,
  //   validate: {
  //     validator: async (value: Types.ObjectId) => {
  //       const user = await User.findById(value);
  //       return Boolean(user);
  //     },
  //     message: 'User does not exist',
  //   },
  // },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Album = mongoose.model('Album', AlbumSchema);

export default Album;