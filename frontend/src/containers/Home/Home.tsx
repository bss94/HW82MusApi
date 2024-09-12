import ArtistItem from '../../components/Artists/ArtistItem.tsx';
import Grid from '@mui/material/Grid2';
import {styled, Typography} from '@mui/material';
import {Link} from 'react-router-dom';


const Home = () => {

  const StyledLink = styled(Link)({
    textDecoration: 'none',
  });
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography component="h1" variant="h5">Title Home</Typography>
      </Grid>
      <Grid size={3}>
        <StyledLink to={'/albums/xxx'}>
          <ArtistItem name={'eminem'} photo={null}/>
        </StyledLink>
      </Grid>
      <Grid size={3}>
        <ArtistItem name={'eminem'} photo={null}/>
      </Grid>
      <Grid size={3}>
        <ArtistItem name={'eminem'} photo={null}/>
      </Grid>
      <Grid size={3}>
        <ArtistItem name={'eminem'} photo={null}/>
      </Grid>


    </Grid>
  );
};

export default Home;