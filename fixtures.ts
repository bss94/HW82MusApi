import mongoose from 'mongoose';
import config from './config';
import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';
import User from './models/User';
import TrackHistory from './models/TrackHistory';


const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;
  try {
    await db.dropCollection('artists');
    await db.dropCollection('albums');
    await db.dropCollection('tracks');
    await db.dropCollection('users');
    await db.dropCollection('trackhistories');
  } catch (err) {
    console.log('skipping drop');
  }

  const [dreArtist, snoopArtist, eminemArtist] = await Artist.create({
      name: 'dr Dre',
      information: 'west side rap artist',
      photo: null
    }, {
      name: 'snoop dogg',
      information: 'west side rap artist',
      photo: null
    }, {
      name: 'eminem',
      information: 'west side rap artist',
      photo: null
    }
  );
  const [firstAlbum, secondAlbum, thirdAlbum] = await Album.create({
      title: 'Still',
      artist: dreArtist,
      date: '1999-10-10',
      image: null
    }, {
      title: 'Snoop Lion',
      artist: snoopArtist,
      date: '2017-10-09',
      image: null
    },
    {
      title: '9 mile',
      artist: eminemArtist,
      date: '2002-02-10',
      image: null
    }
  );

  const [firstTrack, secondTrack, thirdTrack] = await Track.create({
      title: 'Still dre',
      album: firstAlbum,
      time: '3:16'
    }, {
      title: 'No guns Allowed',
      album: secondAlbum,
      time: '3:40'
    },
    {
      title: 'mockingbird',
      album: thirdAlbum,
      time: '3:20'
    }
  );

  const user = new User({
    username: 'user',
    password: 'user',
  });
  user.generateToken();
  await user.save();

  const history = new TrackHistory({
    user: user,
    track: firstTrack,
    datetime: new Date(),
  });
  await history.save();

  const nextHistory = new TrackHistory({
    user: user,
    track: secondTrack,
    datetime: new Date(),
  });
  await nextHistory.save();

  const lastHistory = new TrackHistory({
    user: user,
    track: thirdTrack,
    datetime: new Date(),
  });
  await lastHistory.save();
  await db.close();
};

run().catch(console.error);