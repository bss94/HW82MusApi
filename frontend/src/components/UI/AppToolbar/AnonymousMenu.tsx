import {Button} from '@mui/material';
import {NavLink} from 'react-router-dom';
import Grid from '@mui/material/Grid2';

const AnonymousMenu = () => {
  return (
    <Grid size={12}>
      <Button component={NavLink} to="/register" color="inherit">
        Sign up
      </Button>
      <Button component={NavLink} to="/login" color="inherit">
        Sign in
      </Button>
    </Grid>
  );
};

export default AnonymousMenu;