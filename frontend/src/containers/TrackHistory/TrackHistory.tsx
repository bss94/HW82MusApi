import {useEffect} from 'react';
import Grid from '@mui/material/Grid2';
import {Alert, CircularProgress, Grow, Paper, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {selectTrackHistory, selectTrackHistoryFetching} from '../../store/trackHistoryStore/trackHistorySlice.ts';
import {selectUser} from '../../store/usersStore/usersSlice.ts';
import TrackHistoryItem from '../../components/TrackHistory/TrackHistoryItem.tsx';
import {useNavigate} from 'react-router-dom';
import {fetchTrackHistory} from '../../store/trackHistoryStore/trackHistoryThunks.ts';

const TrackHistory = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const fetching = useAppSelector(selectTrackHistoryFetching);
  const trackHistory = useAppSelector(selectTrackHistory);

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      dispatch(fetchTrackHistory());
    }
  }, [dispatch, navigate, user]);

  return (
    <Grid container spacing={2}>
      {fetching && <Grid size={12} sx={{textAlign: 'center'}}> <CircularProgress/></Grid>}
      <Grid size={12}>
        <Typography component="h1" variant="h5"
                    textTransform="capitalize">Your track history</Typography>
      </Grid>

      {trackHistory.length > 0 ?
        trackHistory.map((el, index) => {
          return (
            <Grid size={12} key={el._id}>
              <Grow
                in={true}
                style={{transformOrigin: '0 0 0'}}
                {...{timeout: index * 500}}
              >
                <Paper elevation={4}>
                  <TrackHistoryItem
                    title={el.track.title}
                    artist={el.artist.name}
                    date={el.datetime}
                  />
                </Paper>
              </Grow>
            </Grid>
          );
        })
        : !fetching && <Grid size={12}>
        <Alert severity="info">Have not listened track yet</Alert>
      </Grid>
      }
    </Grid>
  );
};

export default TrackHistory;