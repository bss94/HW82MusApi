import AlbumItem from '../../components/Albums/AlbumItem.tsx';
import Grid from '@mui/material/Grid2';
import {Alert, CircularProgress, Grow, Paper, styled, Typography} from '@mui/material';
import {Link, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {resetAlbums, selectAlbums, selectAlbumsFetching} from '../../store/albumsStore/albumsSlice.ts';
import {useEffect} from 'react';
import {fetchAlbums} from '../../store/albumsStore/albumsThunks.ts';
import {fetchArtists} from '../../store/artistsStore/artistsThunks.ts';
import {selectArtists} from '../../store/artistsStore/artistsSlice.ts';
import {selectUser} from '../../store/usersStore/usersSlice.ts';

const Albums = () => {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const fetching = useAppSelector(selectAlbumsFetching);
  const albums = useAppSelector(selectAlbums);
  const artists = useAppSelector(selectArtists);
  const artist = artists.find(artist => artist._id === id)?.name;
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(resetAlbums());
    if (artists.length === 0) {
      dispatch(fetchArtists());
    }
    if (id) {
      dispatch(fetchAlbums(id));
    }
  }, [artists.length, dispatch, id]);

  const StyledLink = styled(Link)({
    textDecoration: 'none',
  });
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography component="h1" variant="h5"
                    textTransform="capitalize">{artist && `${artist}s`} Albums</Typography>
      </Grid>
      {fetching && <Grid size={12} sx={{textAlign: 'center'}}><CircularProgress/></Grid>}
      {
        albums.length > 0 ?
          albums.map((album, index) => {
            if (album.isPublished || album.publisher === user?._id || user?.role === 'admin') {
            return (
              <Grid size={3} key={album._id}>
                <Grow
                  in={true}
                  style={{transformOrigin: '0 0 0'}}
                  {...{timeout: index * 500}}
                >
                  <Paper elevation={4}>
                    <StyledLink to={`/album/${album._id}`}>
                      <AlbumItem title={album.title} image={album.image} date={album.date}/>
                    </StyledLink>
                  </Paper>
                </Grow>
              </Grid>
            );}
          })
          :
          !fetching && <Alert severity="info"> Albums not found</Alert>
      }
    </Grid>
  );
};

export default Albums;