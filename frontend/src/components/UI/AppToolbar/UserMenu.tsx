import React, {useState} from 'react';
import {Avatar, Button, Menu, MenuItem, styled} from '@mui/material';
import {User} from '../../../types.ts';
import Grid from '@mui/material/Grid2';

import {useAppDispatch} from '../../../app/hooks.ts';
import {Link, useNavigate} from 'react-router-dom';
import {logout} from '../../../store/usersStore/usersThunks.ts';
import {API_URL} from '../../../constants.ts';
import {fetchArtists} from '../../../store/artistsStore/artistsThunks.ts';

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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const userLogout = async ()=>{
    await dispatch(logout());
    dispatch(fetchArtists())
    navigate('/')
  }

  return (
    <Grid>
      <Button onClick={handleClick} color={'inherit'}>
        <Avatar
          alt={user.displayName}
          src={user.avatar ? `${API_URL}/${user.avatar}` : user.displayName}
          sx={{ width: 46, height: 46, mx:1 }}
        /> Hello, {user.displayName}!
      </Button>
      <Menu open={isOpen} anchorEl={anchorEl} keepMounted onClose={handleClose}>
        <MenuItem onClick={userLogout}>Logout</MenuItem>
        {
          user.role === 'admin' &&
          <MenuItem>
            <StyledLink to="/admins">Admin</StyledLink>
          </MenuItem>
        }
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