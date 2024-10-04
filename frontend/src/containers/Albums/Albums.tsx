import AlbumItem from '../../components/Albums/AlbumItem.tsx';
import Grid from '@mui/material/Grid2';
import {Alert, CircularProgress, Grow, Paper, Typography} from '@mui/material';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {resetAlbums, selectAlbums, selectAlbumsFetching} from '../../store/albumsStore/albumsSlice.ts';
import {useEffect} from 'react';
import {deleteAlbum, fetchAlbums} from '../../store/albumsStore/albumsThunks.ts';
import {fetchArtists} from '../../store/artistsStore/artistsThunks.ts';
import {selectArtists} from '../../store/artistsStore/artistsSlice.ts';
import {selectUser} from '../../store/usersStore/usersSlice.ts';
import {toast} from 'react-toastify';

const Albums = () => {
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const fetching = useAppSelector(selectAlbumsFetching);
    const albums = useAppSelector(selectAlbums);
    const artists = useAppSelector(selectArtists);
    const artist = artists.find(artist => artist._id === id)?.name;
    const user = useAppSelector(selectUser);

    useEffect(() => {
      dispatch(resetAlbums());
      if (artists.length === 0) {
        dispatch(fetchArtists());
      }
      if (id) {
        dispatch(fetchAlbums(id));
      }
    }, [artists.length, dispatch, id]);

    const onHandleDelete = async (albumId: string) => {
      try {
        await dispatch(deleteAlbum(albumId)).unwrap();
        toast.success('Album delete successfully');
        dispatch(resetAlbums());
        if (id) {
          dispatch(fetchAlbums(id));
        }
      } catch (e) {
        toast.error('Something wrong' + (e as Error).message);
      }
    };

    return (
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography component="h1" variant="h5"
                      textTransform="capitalize">{artist && `${artist}s`} Albums</Typography>
        </Grid>
        {fetching && <Grid size={12} sx={{textAlign: 'center'}}><CircularProgress/></Grid>}
        {
          albums.length > 0 ?
            albums.map((album, index) => {
                return (
                  <Grid size={3} key={album._id}>
                    <Grow
                      in={true}
                      style={{transformOrigin: '0 0 0'}}
                      {...{timeout: index * 500}}
                    >
                      <Paper elevation={4}>
                        <AlbumItem album={album} user={user} deleteAlbum={() => onHandleDelete(album._id)}/>
                      </Paper>
                    </Grow>
                  </Grid>
                );
            })
            :
            !fetching && <Alert severity="info"> Albums not found</Alert>
        }
      </Grid>
    );
  }
;

export default Albums;