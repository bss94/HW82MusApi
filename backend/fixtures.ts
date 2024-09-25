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
      photo: 'fixtures/dre.jpg',
      isPublished: true
    }, {
      name: 'snoop dogg',
      information: 'west side rap artist',
      photo: 'fixtures/snoop.jpg',
      isPublished: true
    }, {
      name: 'eminem',
      information: 'west side rap artist',
      photo: 'fixtures/eminem.jpg',
      isPublished: true
    }
  );
  const [
    firstAlbum,
    secondAlbum,
    thirdAlbum,
    fourthAlbum,
    fivesAlbum,
    sixAlbum
  ] = await Album.create({
      title: '2001',
      artist: dreArtist,
      date: 1999,
      image: 'fixtures/DrDre-2001.jpg',
      isPublished: true
    }, {
      title: 'Reincarnated',
      artist: snoopArtist,
      date: 2017,
      image: 'fixtures/Reincarnated.jpg',
      isPublished: true
    },
    {
      title: 'Encore',
      artist: eminemArtist,
      date: 2004,
      image: 'fixtures/Encore_album.jpg',
      isPublished: true
    },
    {
      title: 'Dr Dre & Friends',
      artist: dreArtist,
      date: 2003,
      image: 'fixtures/dreFriends.png',
      isPublished: true
    }, {
      title: 'California Times',
      artist: snoopArtist,
      date: 2017,
      image: 'fixtures/California-Times.jpg',
      isPublished: true
    },
    {
      title: 'Kamikaze',
      artist: eminemArtist,
      date: 2018,
      image: 'fixtures/Eminem-kamikaze.jpg',
      isPublished: true
    }
  );


  const [firstTrack, secondTrack, thirdTrack] = await Track.create(
    {
      title: 'Still DRE',
      album: firstAlbum,
      time: '4:31',
      trackNumber: 4,
      isPublished: true
    },
    {
      title: 'No guns Allowed',
      album: secondAlbum,
      time: '3:32',
      trackNumber: 6,
      isPublished: true
    },
    {
      title: 'Mockingbird',
      album: thirdAlbum,
      time: '4:11',
      trackNumber: 16,
      isPublished: true
    }
  );
  await Track.create(
    {
      title: 'Next Episode',
      album: firstAlbum,
      time: '2:42',
      trackNumber: 11,
      isPublished: true
    },
    {
      title: 'Bitch Niggaz',
      album: firstAlbum,
      time: '4:14',
      trackNumber: 13,
      isPublished: true
    },
    {
      title: 'Murder inc',
      album: firstAlbum,
      time: '2:20',
      trackNumber: 15,
      isPublished: true
    },
    {
      title: 'Lolo(intro)',
      album: firstAlbum,
      time: '0:41',
      trackNumber: 1,
      isPublished: true
    },
    {
      title: 'Nuthin but a G Thang',
      album: fourthAlbum,
      time: '3:57',
      trackNumber: 3,
      isPublished: true
    },
    {
      title: 'Riders Ride',
      album: fourthAlbum,
      time: '4:57',
      trackNumber: 4,
      isPublished: true
    },
    {
      title: 'Money',
      album: fourthAlbum,
      time: '4:13',
      trackNumber: 1,
      isPublished: true
    },
    {
      title: 'Hellbound',
      album: fourthAlbum,
      time: '3:58',
      trackNumber: 2,
      isPublished: true
    },
    {
      title: 'Deep Cover',
      album: fourthAlbum,
      time: '4:10',
      trackNumber: 14,
      isPublished: true
    },
    {
      title: 'Lighters Up',
      album: secondAlbum,
      time: '3:47',
      trackNumber: 3,
      isPublished: true
    },
    {
      title: 'La La La',
      album: secondAlbum,
      time: '3:28',
      trackNumber: 15,
      isPublished: true
    },
    {
      title: 'Smoke the Weed',
      album: secondAlbum,
      time: '3:29',
      trackNumber: 8,
      isPublished: true
    },
    {
      title: 'Remedy',
      album: secondAlbum,
      time: '3:01',
      trackNumber: 14,
      isPublished: true
    },
    {
      title: 'Around the World',
      album: fivesAlbum,
      time: '4:10',
      trackNumber: 7,
      isPublished: true
    },
    {
      title: 'Cadillacs',
      album: fivesAlbum,
      time: '3:16',
      trackNumber: 6,
      isPublished: true
    },
    {
      title: 'Happy Birthday',
      album: fivesAlbum,
      time: '2:48',
      trackNumber: 1,
      isPublished: true
    },
    {
      title: 'Never Had It Like This',
      album: fivesAlbum,
      time: '4:16',
      trackNumber: 3,
      isPublished: true
    },
    {
      title: 'Phenomenon',
      album: fivesAlbum,
      time: '3:01',
      trackNumber: 2,
      isPublished: true
    },
    {
      title: 'Just Lose It',
      album: thirdAlbum,
      time: '4:06',
      trackNumber: 13,
      isPublished: true
    },
    {
      title: 'Like Toy Soldiers',
      album: thirdAlbum,
      time: '4:57',
      trackNumber: 5,
      isPublished: true
    },
    {
      title: 'Rain man',
      album: thirdAlbum,
      time: '5:14',
      trackNumber: 10,
      isPublished: true
    },
    {
      title: 'Ass like That',
      album: thirdAlbum,
      time: '4:26',
      trackNumber: 14,
      isPublished: true
    },
    {
      title: 'The Ringer',
      album: sixAlbum,
      time: '3:01',
      trackNumber: 1,
      isPublished: true
    },
    {
      title: 'Greatest',
      album: sixAlbum,
      time: '4:06',
      trackNumber: 2,
      isPublished: true
    },
    {
      title: 'Lucky you',
      album: sixAlbum,
      time: '4:57',
      trackNumber: 3,
      isPublished: true
    },
    {
      title: 'Normal',
      album: sixAlbum,
      time: '5:14',
      trackNumber: 5,
      isPublished: true
    },
    {
      title: 'Venom',
      album: sixAlbum,
      time: '4:26',
      trackNumber: 13,
      isPublished: true
    },
  );


  const admin = new User({
    username: 'admin',
    password: 'admin',
    role: 'admin'
  });
  admin.generateToken();
  await admin.save();
  const user = new User({
    username: 'user',
    password: 'user',
  });
  user.generateToken();
  await user.save();

  const history = new TrackHistory({
    user: user,
    track: firstTrack,
    artist: dreArtist,
    datetime: new Date(),
  });
  await history.save();

  const nextHistory = new TrackHistory({
    user: user,
    track: secondTrack,
    artist: snoopArtist,
    datetime: new Date(),
  });
  await nextHistory.save();

  const lastHistory = new TrackHistory({
    user: user,
    track: thirdTrack,
    artist: eminemArtist,
    datetime: new Date(),
  });
  await lastHistory.save();
  await db.close();
};

run().catch(console.error);