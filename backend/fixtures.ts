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
      photo: 'fixtures/dre.jpg'
    }, {
      name: 'snoop dogg',
      information: 'west side rap artist',
      photo: 'fixtures/snoop.jpg'
    }, {
      name: 'eminem',
      information: 'west side rap artist',
      photo: 'fixtures/eminem.jpg'
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
      image: 'fixtures/DrDre-2001.jpg'
    }, {
      title: 'Reincarnated',
      artist: snoopArtist,
      date: 2017,
      image: 'fixtures/Reincarnated.jpg'
    },
    {
      title: 'Encore',
      artist: eminemArtist,
      date: 2004,
      image: 'fixtures/Encore_album.jpg'
    },
    {
      title: 'Dr Dre & Friends',
      artist: dreArtist,
      date: 2003,
      image: 'fixtures/dreFriends.png'
    }, {
      title: 'California Times',
      artist: snoopArtist,
      date: 2017,
      image: 'fixtures/California-Times.jpg'
    },
    {
      title: 'Kamikaze',
      artist: eminemArtist,
      date: 2018,
      image: 'fixtures/Eminem-kamikaze.jpg'
    }
  );


  const [firstTrack, secondTrack, thirdTrack] = await Track.create(
    {
      title: 'Still DRE',
      album: firstAlbum,
      time: '4:31',
      trackNumber: 4
    },
    {
      title: 'No guns Allowed',
      album: secondAlbum,
      time: '3:32',
      trackNumber: 6
    },
    {
      title: 'Mockingbird',
      album: thirdAlbum,
      time: '4:11',
      trackNumber:16
    }
  );
  await Track.create(
    {
      title: 'Next Episode',
      album: firstAlbum,
      time: '2:42',
      trackNumber: 11
    },
    {
      title: 'Bitch Niggaz',
      album: firstAlbum,
      time: '4:14',
      trackNumber: 13
    },
    {
      title: 'Murder inc',
      album: firstAlbum,
      time: '2:20',
      trackNumber: 15
    },
    {
      title: 'Lolo(intro)',
      album: firstAlbum,
      time: '0:41',
      trackNumber: 1
    },
    {
      title: 'Nuthin but a G Thang',
      album: fourthAlbum,
      time: '3:57',
      trackNumber: 3
    },
    {
      title: 'Riders Ride',
      album: fourthAlbum,
      time: '4:57',
      trackNumber: 4
    },
    {
      title: 'Money',
      album: fourthAlbum,
      time: '4:13',
      trackNumber: 1
    },
    {
      title: 'Hellbound',
      album: fourthAlbum,
      time: '3:58',
      trackNumber: 2
    },
    {
      title: 'Deep Cover',
      album: fourthAlbum,
      time: '4:10',
      trackNumber: 14
    },
    {
      title: 'Lighters Up',
      album: secondAlbum,
      time: '3:47',
      trackNumber: 3
    },
    {
      title: 'La La La',
      album: secondAlbum,
      time: '3:28',
      trackNumber: 15
    },
    {
      title: 'Smoke the Weed',
      album: secondAlbum,
      time: '3:29',
      trackNumber: 8
    },
    {
      title: 'Remedy',
      album: secondAlbum,
      time: '3:01',
      trackNumber: 14
    },
    {
      title: 'Around the World',
      album: fivesAlbum,
      time: '4:10',
      trackNumber: 7
    },
    {
      title: 'Cadillacs',
      album: fivesAlbum,
      time: '3:16',
      trackNumber: 6
    },
    {
      title: 'Happy Birthday',
      album: fivesAlbum,
      time: '2:48',
      trackNumber: 1
    },
    {
      title: 'Never Had It Like This',
      album: fivesAlbum,
      time: '4:16',
      trackNumber: 3
    },
    {
      title: 'Phenomenon',
      album: fivesAlbum,
      time: '3:01',
      trackNumber: 2
    },
    {
      title: 'Just Lose It',
      album: thirdAlbum,
      time: '4:06',
      trackNumber: 13
    },
    {
      title: 'Like Toy Soldiers',
      album: thirdAlbum,
      time: '4:57',
      trackNumber: 5
    },
    {
      title: 'Rain man',
      album: thirdAlbum,
      time: '5:14',
      trackNumber: 10
    },
    {
      title: 'Ass like That',
      album: thirdAlbum,
      time: '4:26',
      trackNumber: 14
    },
    {
      title: 'The Ringer',
      album: sixAlbum,
      time: '3:01',
      trackNumber: 1
    },
    {
      title: 'Greatest',
      album: sixAlbum,
      time: '4:06',
      trackNumber: 2
    },
    {
      title: 'Lucky you',
      album: sixAlbum,
      time: '4:57',
      trackNumber: 3
    },
    {
      title: 'Normal',
      album: sixAlbum,
      time: '5:14',
      trackNumber: 5
    },
    {
      title: 'Venom',
      album: sixAlbum,
      time: '4:26',
      trackNumber: 13
    },
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
    artist:dreArtist,
    datetime: new Date(),
  });
  await history.save();

  const nextHistory = new TrackHistory({
    user: user,
    track: secondTrack,
    artist:snoopArtist,
    datetime: new Date(),
  });
  await nextHistory.save();

  const lastHistory = new TrackHistory({
    user: user,
    track: thirdTrack,
    artist:eminemArtist,
    datetime: new Date(),
  });
  await lastHistory.save();
  await db.close();
};

run().catch(console.error);