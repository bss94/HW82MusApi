import AlbumItem from '../../components/Albums/AlbumItem.tsx';
import Grid from '@mui/material/Grid2';
import {styled, Typography} from '@mui/material';
import {Link} from 'react-router-dom';

const Albums = () => {

  const StyledLink = styled(Link)({
    textDecoration: 'none',
  });
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography component="h1" variant="h5">Title Albums</Typography>
      </Grid>
      <Grid size={3}>
        <StyledLink to={'/tracks/xxx'}>
          <AlbumItem title={'asdaw'} date={2015} image={null}/>
        </StyledLink>
      </Grid>
      <Grid size={3}>
        <StyledLink to={'/tracks/xxx'}>
          <AlbumItem title={'asdaw'} date={2015} image={null}/>
        </StyledLink>
      </Grid><Grid size={3}>
      <StyledLink to={'/tracks/xxx'}>
        <AlbumItem title={'asdaw'} date={2015} image={null}/>
      </StyledLink>
    </Grid><Grid size={3}>
      <StyledLink to={'/tracks/xxx'}>
        <AlbumItem title={'asdaw'} date={2015} image={null}/>
      </StyledLink>
    </Grid>

    </Grid>
  );
};

export default Albums;