import Grid from '@mui/material/Grid2';
import { Button, styled, Typography } from '@mui/material';
import { Link, Outlet, useLocation } from 'react-router-dom';

export const StyledLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const Admins = () => {
  const { pathname: location } = useLocation();
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography component="h1" variant="h5">
          Admins Panel
        </Typography>
      </Grid>
      <Grid size={12} display="flex" alignItems="center" justifyContent="space-evenly">
        <StyledLink to={`artists`}>
          <Button variant="outlined" color={location.includes('artists') ? 'warning' : 'primary'}>
            Artists
          </Button>
        </StyledLink>

        <StyledLink to={`albums`}>
          <Button variant="outlined" color={location.includes('albums') ? 'warning' : 'primary'}>
            Albums
          </Button>
        </StyledLink>
        <StyledLink to={`tracks`}>
          <Button variant="outlined" color={location.includes('tracks') ? 'warning' : 'primary'}>
            Tracks
          </Button>
        </StyledLink>
      </Grid>

      <Outlet />
    </Grid>
  );
};

export default Admins;
