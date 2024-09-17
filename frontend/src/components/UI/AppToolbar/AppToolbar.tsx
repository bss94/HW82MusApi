import {AppBar, styled, Toolbar, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import {useAppSelector} from '../../../app/hooks.ts';
import {selectUser} from '../../../store/usersStore/usersSlice.ts';
import AnonymousMenu from './AnonymousMenu.tsx';
import UserMenu from './UserMenu.tsx';

const StyledLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar position="sticky" sx={{mb: 2}}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
          <StyledLink to="/">MyMusic</StyledLink>
        </Typography>
        <Grid container spacing={2}>
          {user ? <UserMenu user={user}/> : <AnonymousMenu/>}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
