import React, {useState} from 'react';
import {Button, Menu, MenuItem, styled} from '@mui/material';
import {User} from '../../../types.ts';
import Grid from '@mui/material/Grid2';

import {useAppDispatch} from '../../../app/hooks.ts';
import {Link} from 'react-router-dom';
import {logout} from '../../../store/usersStore/usersThunks.ts';

const StyledLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid>
      <Button onClick={handleClick} color={'inherit'}>Hello, {user.username}!</Button>
      <Menu open={isOpen} anchorEl={anchorEl} keepMounted onClose={handleClose}>
        <MenuItem onClick={() => {
          dispatch(logout());
        }}>Logout</MenuItem>
        <MenuItem>
          <StyledLink to="/track_history">Track History</StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink to="/new-artist">Create artist</StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink to="/new-album">Create album</StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink to="/new-track">Create track</StyledLink>
        </MenuItem>
      </Menu>
    </Grid>
  );
};

export default UserMenu;