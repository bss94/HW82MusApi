import ArtistItem from '../../components/Artists/ArtistItem.tsx';
import Grid from '@mui/material/Grid2';
import {Alert, CircularProgress, Grow, Paper, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {useEffect} from 'react';
import {selectArtists, selectArtistsFetching} from '../../store/artistsStore/artistsSlice.ts';
import {deleteArtist, fetchArtists} from '../../store/artistsStore/artistsThunks.ts';
import {selectUser} from '../../store/usersStore/usersSlice.ts';
import {toast} from 'react-toastify';


const Home = () => {
  const dispatch = useAppDispatch();
  const fetching = useAppSelector(selectArtistsFetching);
  const artists = useAppSelector(selectArtists);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const onHandleDelete = async (artistId: string) => {
    try {
      await dispatch(deleteArtist(artistId)).unwrap();
      toast.success('Artist delete successfully');
      dispatch(fetchArtists());
    } catch (e) {
      toast.error('Something wrong' + (e as Error).message);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography component="h1" variant="h5">Artists</Typography>
      </Grid>
      {fetching && <Grid size={12} sx={{textAlign: 'center'}}> <CircularProgress/> </Grid>}

      {artists.length > 0 ? artists.map((artist, index) => {
        if (artist.isPublished || artist.publisher === user?._id || user?.role === 'admin') {
          return (
            <Grid size={3} key={artist._id}>
              <Grow
                in={true}
                style={{transformOrigin: '0 0 0'}}
                {...{timeout: index * 500}}
              >
                <Paper elevation={4}>
                  <ArtistItem artist={artist} user={user} deleteArtist={()=>onHandleDelete(artist._id)}/>
                </Paper>
              </Grow>
            </Grid>
          );
        }
      })
      :!fetching && <Alert severity="info"> Artist not found</Alert>
      }
    </Grid>
  );
};

export default Home;