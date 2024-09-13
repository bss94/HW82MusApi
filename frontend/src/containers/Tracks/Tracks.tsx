import TrackItem from '../../components/Tracks/TrackItem.tsx';
import Grid from '@mui/material/Grid2';
import {CircularProgress, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {useParams} from 'react-router-dom';
import {
  resetTracks,
  selectAlbum,
  selectArtist,
  selectTracks,
  selectTracksFetching
} from '../../store/tracksStore/tracksSlice.ts';
import {useEffect} from 'react';
import {fetchTracks} from '../../store/tracksStore/tracksThunks.ts';


const Tracks = () => {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const fetching = useAppSelector(selectTracksFetching);
  const album = useAppSelector(selectAlbum);
  const artist = useAppSelector(selectArtist);
  const tracks = useAppSelector(selectTracks);

  useEffect(() => {
    dispatch(resetTracks())
    if (id) {
      dispatch(fetchTracks(id));
    }
  }, []);

  return (
    <Grid container spacing={2}>
      {fetching && <Grid size={12} sx={{textAlign: 'center'}}> <CircularProgress/></Grid>}


      {artist && album ?
        <Grid size={12}>
          <Typography component="h1" variant="h5" textTransform='capitalize'>{`${artist}\'s album ${album}`}</Typography>
        </Grid>
        : !fetching && <Grid size={12}>
          <Typography component="h1" variant="h5">Album and Artist not found</Typography>
        </Grid>
      }
      {tracks.length > 0 ?
        tracks.map(track => {
          return (
            <Grid size={12} key={track._id}>
              <TrackItem trackNumber={track.trackNumber} title={track.title} time={track.time}/>
            </Grid>
          );
        })
        : !fetching && <Grid size={12}>
          <Typography component="h1" variant="h5">Have not tracks yet!</Typography>
        </Grid>
      }
    </Grid>
  );
};

export default Tracks;