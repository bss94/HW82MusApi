import React, {useState} from 'react';
import {ArtistMutation} from '../../types.ts';
import Grid from '@mui/material/Grid2';
import {LoadingButton} from '@mui/lab';
import {TextField, Typography} from '@mui/material';
import FileInput from '../UI/FileInput/FileInput.tsx';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {selectArtistCreating} from '../../store/artistsStore/artistsSlice.ts';
import {createArtists} from '../../store/artistsStore/artistsThunks.ts';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';

const ArtistForm = () => {
  const dispatch = useAppDispatch();
  const sending = useAppSelector(selectArtistCreating);
  const navigate = useNavigate();
  const [state, setState] = useState<ArtistMutation>({
    name: '',
    information: '',
    photo: null
  });

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(createArtists(state)).unwrap()
      toast.success('Artist created')
      navigate('/')
    }catch (error){
      toast.error('An error occurred while creating artists'+ (error as Error).message);
    }
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = event.target;
    const value = files && files[0] ? files[0] : null;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Grid container direction="column" spacing={2} component="form" onSubmit={submitFormHandler}>
      <Grid size={12}>
        <Typography component="h1" variant="h5">Create new artist</Typography>
      </Grid>
      <Grid size={12}>
        <TextField required
                   fullWidth
                   label="Name"
                   id="name"
                   name="name"
                   value={state.name}
                   onChange={inputChangeHandler}/>
      </Grid>
      <Grid size={12}>
        <TextField
          fullWidth
          multiline
          minRows={3}
          label="Information"
          id="information"
          name="information"
          value={state.information}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid>
        <FileInput label="Photo"
                   name="photo"
                   onChange={fileInputChangeHandler}
                   required={true}
        />
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
    </Grid>
  );
};

export default ArtistForm;