import mongoose, {Types} from 'mongoose';
import Album from './Album';
import User from './User';

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const album = await Album.findById(value);
        return Boolean(album);
      },
      message: 'Album does not exist',
    },
  },
  time: {
    type: String,
    validate: {
      validator: async (value: string) => {
        if (value.includes(':')) {
          const strArr = value.split(':');
          return (
            strArr.length === 2
            && strArr[1].length === 2
            && !isNaN(Number(strArr[0]))
            && !isNaN(Number(strArr[1]))
            && parseInt(strArr[0]) >= 0
            && parseInt(strArr[1]) >= 0
            && parseInt(strArr[1]) < 60
          );
        } else return false;
      },
      message: 'Time must be on mm:ss format',
    },
  },
  trackNumber: {
    type: Number,
    required: true,
  },
  publisher: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User does not exist',
    },
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Track = mongoose.model('Track', TrackSchema);

export default Track;