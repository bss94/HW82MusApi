import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { AlbumMutation, User } from '../../types.ts';
import Grid from '@mui/material/Grid2';
import { CircularProgress, MenuItem, TextField, Typography } from '@mui/material';
import FileInput from '../UI/FileInput/FileInput.tsx';
import { LoadingButton } from '@mui/lab';
import { selectAlbumCreating } from '../../store/albumsStore/albumsSlice.ts';
import { selectArtists, selectArtistsFetching } from '../../store/artistsStore/artistsSlice.ts';
import { fetchArtists } from '../../store/artistsStore/artistsThunks.ts';
import { createAlbums } from '../../store/albumsStore/albumsThunks.ts';
import { toast } from 'react-toastify';

interface Props {
  user: User | null;
}

const AlbumForm: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const sending = useAppSelector(selectAlbumCreating);
  const navigate = useNavigate();
  const fetching = useAppSelector(selectArtistsFetching);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const [state, setState] = useState<AlbumMutation>({
    title: '',
    artist: '',
    date: 1900,
    image: null,
  });

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (state.date > 1900 && state.date < 2030) {
        await dispatch(createAlbums(state)).unwrap();
        toast.success('Album created');
        navigate('/');
      } else {
        toast.error('Date is invalid! date must be bigger then 1900 and lower then 2030');
      }
    } catch (error) {
      toast.error('An error occurred while creating album' + (error as Error).message);
    }
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Grid container direction="column" spacing={2} component="form" onSubmit={submitFormHandler}>
      <Grid size={12}>
        <Typography component="h1" variant="h5">
          Create new album
        </Typography>
      </Grid>
      {fetching ? (
        <Grid size={12} sx={{ textAlign: 'center' }}>
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <Grid size={12}>
            <TextField
              required
              fullWidth
              label="Title"
              id="title"
              name="title"
              value={state.title}
              onChange={inputChangeHandler}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              required
              fullWidth
              type="number"
              label="Date"
              id="date"
              name="date"
              value={state.date}
              onChange={inputChangeHandler}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              required
              fullWidth
              select
              label="Artist"
              id="artist"
              name="artist"
              value={state.artist}
              onChange={inputChangeHandler}
            >
              <MenuItem value="">Select artist</MenuItem>
              {artists.map((artist) => {
                if (artist.isPublished || artist.publisher === user?._id || user?.role === 'admin') {
                  return (
                    <MenuItem
                      value={artist._id}
                      key={artist._id}
                      sx={{ color: !artist.isPublished ? 'orangered' : 'inherit' }}
                    >
                      {artist.name} {!artist.isPublished && '(Unpublished)'}
                    </MenuItem>
                  );
                }
              })}
            </TextField>
          </Grid>
          <Grid>
            <FileInput label="Image" name="image" onChange={fileInputChangeHandler} required={true} />
          </Grid>
          <Grid>
            <LoadingButton type="submit" loading={sending} loadingPosition="center" variant="contained">
              <span>Send</span>
            </LoadingButton>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default AlbumForm;
