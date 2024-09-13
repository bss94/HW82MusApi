import TrackItem from '../../components/Tracks/TrackItem.tsx';
import Grid from '@mui/material/Grid2';
import {Alert, CircularProgress, Grow, Paper, Typography} from '@mui/material';
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
    dispatch(resetTracks());
    if (id) {
      dispatch(fetchTracks(id));
    }
  }, [dispatch, id]);

  return (
    <Grid container spacing={2}>
      {fetching && <Grid size={12} sx={{textAlign: 'center'}}> <CircularProgress/></Grid>}


      {artist && album ?
        <Grid size={12}>
          <Typography component="h1" variant="h5"
                      textTransform="capitalize">{`${artist}s album ${album}`}</Typography>
        </Grid>
        : !fetching && <Grid size={12}>
        <Typography component="h1" variant="h5">Album and Artist not found</Typography>
      </Grid>
      }
      {tracks.length > 0 ?
        tracks.map((track,index) => {
          return (
            <Grid size={12} key={track._id}>
              <Grow
                in={true}
                style={{transformOrigin: '0 0 0'}}
                {...{timeout: index * 500}}
              >
                <Paper elevation={4}>
                  <TrackItem trackNumber={track.trackNumber} title={track.title} time={track.time}/>
                </Paper>
              </Grow>
            </Grid>
          );
        })
        : !fetching && <Grid size={12}>
        <Alert severity="info">Have not track yet</Alert>
      </Grid>
      }
    </Grid>
  );
};

export default Tracks;