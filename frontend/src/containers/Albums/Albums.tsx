import AlbumItem from '../../components/Albums/AlbumItem.tsx';
import Grid from '@mui/material/Grid2';
import {CircularProgress, styled, Typography} from '@mui/material';
import {Link, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {resetAlbums, selectAlbums, selectAlbumsFetching} from '../../store/albumsStore/albumsSlice.ts';
import {useEffect} from 'react';
import {fetchAlbums} from '../../store/albumsStore/albumsThunks.ts';
import {fetchArtists} from '../../store/artistsStore/artistsThunks.ts';
import {selectArtists} from '../../store/artistsStore/artistsSlice.ts';

const Albums = () => {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const fetching = useAppSelector(selectAlbumsFetching);
  const albums = useAppSelector(selectAlbums);
  const artists = useAppSelector(selectArtists);
  const artist = artists.find(artist => artist._id === id)?.name;

  useEffect(() => {
    dispatch(resetAlbums());
    if (artists.length === 0) {
      dispatch(fetchArtists());
    }
    if (id) {
      dispatch(fetchAlbums(id));
    }
  }, [dispatch]);

  const StyledLink = styled(Link)({
    textDecoration: 'none',
  });
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography component="h1" variant="h5"
                    textTransform="capitalize">{artist && `${artist}\'s`} Albums</Typography>
      </Grid>
      {fetching && <Grid size={12} sx={{textAlign: 'center'}}><CircularProgress/></Grid>}
      {
        albums.length > 0 ?
          albums.map(album => {
            return (
              <Grid size={3} key={album._id}>
                <StyledLink to={`/album/${album._id}`}>
                  <AlbumItem title={album.title} image={album.image} date={album.date}/>
                </StyledLink>
              </Grid>
            );
          })
          :
          !fetching && <Typography component="h1" variant="h5" textTransform="capitalize">{artist && `${artist}\'s`} Albums not found
            yet</Typography>
      }
    </Grid>
  );
};

export default Albums;