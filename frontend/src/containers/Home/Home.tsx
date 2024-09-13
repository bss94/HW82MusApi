import ArtistItem from '../../components/Artists/ArtistItem.tsx';
import Grid from '@mui/material/Grid2';
import {CircularProgress, styled, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {useEffect} from 'react';
import {selectArtists, selectArtistsFetching} from '../../store/artistsStore/artistsSlice.ts';
import {fetchArtists} from '../../store/artistsStore/artistsThunks.ts';


const Home = () => {
  const dispatch = useAppDispatch();
  const fetching = useAppSelector(selectArtistsFetching);
  const artists = useAppSelector(selectArtists);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const StyledLink = styled(Link)({
    textDecoration: 'none',
  });
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography component="h1" variant="h5">Artists</Typography>
      </Grid>
      {fetching && <Grid size={12} sx={{textAlign: 'center'}}> <CircularProgress/> </Grid>}

      {artists.length > 0 && artists.map(artist => {
        return (
          <Grid size={3} key={artist._id}>
            <StyledLink to={`/artist/${artist._id}`}>
              <ArtistItem name={artist.name} photo={artist.photo} information={artist.information}/>
            </StyledLink>
          </Grid>
        );
      })}


    </Grid>
  );
};

export default Home;