import {AppBar, Button, styled, Toolbar, Typography} from '@mui/material';
import {Link, NavLink} from 'react-router-dom';
import Grid from '@mui/material/Grid2';

const StyledLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const AppToolbar = () => {
  return (
    <AppBar position="sticky" sx={{mb: 2}}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
          <StyledLink to="/">MyMusic</StyledLink>
        </Typography>
        <Grid container spacing={2}>
          <Button component={NavLink} to="/register" color="inherit">
            Sign up
          </Button>
          <Button component={NavLink} to="/login" color="inherit">
            Sign in
          </Button>
        </Grid>

      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
