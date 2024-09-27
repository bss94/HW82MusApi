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
import {selectUser} from '../../store/usersStore/usersSlice.ts';
import {trackHistoryCreate} from '../../store/trackHistoryStore/trackHistoryThunks.ts';
import {toast} from 'react-toastify';


const Tracks = () => {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const fetching = useAppSelector(selectTracksFetching);
  const album = useAppSelector(selectAlbum);
  const artist = useAppSelector(selectArtist);
  const tracks = useAppSelector(selectTracks);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(resetTracks());
    if (id) {
      dispatch(fetchTracks(id));
    }
  }, [dispatch, id]);

  const addToHistory = async (trackId: string) => {
    try {
      await dispatch(trackHistoryCreate(trackId)).unwrap();
      toast.success('Track history updated');
    } catch (e) {
      toast.error('something wrong');
    }

  };

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
        tracks.map((track, index) => {
          if (track.isPublished || track.publisher === user?._id || user?.role === 'admin') {
          return (
            <Grid size={12} key={track._id}>
              <Grow
                in={true}
                style={{transformOrigin: '0 0 0'}}
                {...{timeout: index * 500}}
              >
                <Paper elevation={4}>
                  <TrackItem
                    addToHistory={() => {
                      addToHistory(track._id);
                    }}
                    trackNumber={track.trackNumber}
                    title={track.title}
                    time={track.time}
                    user={user}/>
                </Paper>
              </Grow>
            </Grid>
          );}
        })
        : !fetching && <Grid size={12}>
        <Alert severity="info">Have not track yet</Alert>
      </Grid>
      }
    </Grid>
  );
};

export default Tracks;