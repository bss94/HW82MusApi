import React, {useEffect, useState} from 'react';
import {TrackMutation, User} from '../../types.ts';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {selectArtists, selectArtistsFetching} from '../../store/artistsStore/artistsSlice.ts';
import {selectAlbums, selectAlbumsFetching} from '../../store/albumsStore/albumsSlice.ts';
import {useNavigate} from 'react-router-dom';
import {fetchArtists} from '../../store/artistsStore/artistsThunks.ts';
import {selectTracksCreating} from '../../store/tracksStore/tracksSlice.ts';
import Grid from '@mui/material/Grid2';
import {CircularProgress, MenuItem, TextField, Typography} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {fetchAlbums} from '../../store/albumsStore/albumsThunks.ts';
import {toast} from 'react-toastify';
import {createTracks} from '../../store/tracksStore/tracksThunks.ts';

interface Props {
  user: User | null;
}

const TrackForm: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const albums = useAppSelector(selectAlbums);
  const sending = useAppSelector(selectTracksCreating);
  const navigate = useNavigate();
  const fetchingArtist = useAppSelector(selectArtistsFetching);
  const fetchingAlbums = useAppSelector(selectAlbumsFetching);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);
  const [state, setState] = useState<TrackMutation>({
    title: '',
    album: '',
    trackNumber: 0,
    time: ''
  });
  const [currentArtist, setCurrentArtist] = useState<string>('');
  useEffect(() => {
    dispatch(fetchAlbums(currentArtist));
  }, [dispatch, currentArtist]);

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(createTracks({
        ...state,
        title: state.title.trim()
      })).unwrap();
      toast.success('Track created');
      navigate('/');
    } catch (error) {
      toast.error('An error occurred while creating Track' + (error as Error).message);
    }
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const ArtistChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentArtist(event.target.value);
    setState((prevState) => ({
      ...prevState,
      album: '',
    }));
  };


  return (
    <Grid container direction="column" spacing={2} component="form" onSubmit={submitFormHandler}>
      <Grid size={12}>
        <Typography component="h1" variant="h5">Create new track</Typography>
      </Grid>
      {fetchingArtist ?
        <Grid size={12} sx={{textAlign: 'center'}}>
          <CircularProgress/>
        </Grid>
        :
        <>
          <Grid size={12}>
            <TextField
              required
              fullWidth
              label="Title"
              id="title"
              name="title"
              value={state.title}
              onChange={inputChangeHandler}/>

          </Grid>
          <Grid size={12}>
            <TextField
              required
              fullWidth
              type="number"
              label="Track Number"
              id="trackNumber"
              name="trackNumber"
              value={state.trackNumber}
              onChange={inputChangeHandler}/>
          </Grid>
          <Grid size={12}>
            <TextField
              required
              fullWidth
              select
              label="Artist"
              id="artist"
              name="artist"
              value={currentArtist}
              onChange={ArtistChangeHandler}
            >
              <MenuItem value="">
                Select artist
              </MenuItem>
              {artists.map((artist) => {
                if (artist.isPublished || artist.publisher === user?._id || user?.role === 'admin') {
                  return <MenuItem value={artist._id} key={artist._id}
                                   sx={{color: !artist.isPublished ? 'orangered' : 'inherit'}}>
                    {artist.name} {!artist.isPublished && '(Unpublished)'}
                  </MenuItem>;
                }
              })}
            </TextField>
          </Grid>

          {fetchingAlbums
            ?
            <Grid size={12} sx={{textAlign: 'center'}}>
              <CircularProgress/>
            </Grid>
            :
            <Grid size={12}>
              <TextField
                required
                fullWidth
                disabled={currentArtist === ''}
                select
                label="Album"
                id="album"
                name="album"
                value={state.album}
                onChange={inputChangeHandler}
              >
                <MenuItem value="">
                  Select artist
                </MenuItem>
                {albums.map((album) => {
                  if (album.isPublished || album.publisher === user?._id || user?.role === 'admin') {
                    return <MenuItem value={album._id} key={album._id}
                                     sx={{color: !album.isPublished ? 'orangered' : 'inherit'}}>
                      {album.title} {!album.isPublished && '(Unpublished)'}
                    </MenuItem>;
                  }
                })}
              </TextField>
            </Grid>
          }
          <Grid size={12}>
            <TextField
              required
              fullWidth
              type="time"
              label="Time"
              id="time"
              name="time"
              value={state.time}
              onChange={inputChangeHandler}/>
          </Grid>
          <Grid>
            <LoadingButton
              type="submit"
              loading={sending}
              loadingPosition="center"
              variant="contained"
            >
              <span>Send</span>
            </LoadingButton>
          </Grid>
        </>
      }
    </Grid>
  );
};

export default TrackForm;