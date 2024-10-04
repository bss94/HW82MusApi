import Grid from '@mui/material/Grid2';
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';
import { StyledTableCell, StyledTableRow } from './AdminsArtists.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  selectAlbumDeleting,
  selectAlbumPublishing,
  selectAlbums,
  selectAlbumsFetching,
} from '../../store/albumsStore/albumsSlice.ts';
import { deleteAlbum, fetchAlbums, toggleAlbumPublic } from '../../store/albumsStore/albumsThunks.ts';

const AdminsAlbums = () => {
  const dispatch = useAppDispatch();
  const fetching = useAppSelector(selectAlbumsFetching);
  const albums = useAppSelector(selectAlbums);
  const deleting = useAppSelector(selectAlbumDeleting);
  const publishing = useAppSelector(selectAlbumPublishing);

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  const onAlbumDelete = async (id: string) => {
    try {
      await dispatch(deleteAlbum(id)).unwrap();
      toast.success('Album delete successfully');
      dispatch(fetchAlbums());
    } catch (e) {
      toast.error('Something wrong' + (e as Error).message);
    }
  };
  const onAlbumPublic = async (id: string) => {
    try {
      await dispatch(toggleAlbumPublic(id));
      toast.success('Album published successfully');
      dispatch(fetchAlbums());
    } catch (e) {
      toast.error('Something wrong' + (e as Error).message);
    }
  };

  return (
    <Grid size={12}>
      <Grid size={12}>
        <Typography component="h1" variant="h6" sx={{ my: 2 }}>
          Albums Table
        </Typography>
      </Grid>
      {fetching ? (
        <Grid size={12} sx={{ textAlign: 'center' }}>
          <CircularProgress />
        </Grid>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: '100%' }}>
            <TableHead color="primary">
              <TableRow>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell align="right">Artist</StyledTableCell>
                <StyledTableCell align="right">Date</StyledTableCell>
                <StyledTableCell align="right">Image</StyledTableCell>
                <StyledTableCell align="right">isPublished</StyledTableCell>
                <StyledTableCell align="right">Publisher</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {albums.map((album) => (
                <StyledTableRow key={album._id}>
                  <StyledTableCell component="th" scope="row">
                    {album.title}
                  </StyledTableCell>
                  <StyledTableCell align="right">{album.artist}</StyledTableCell>
                  <StyledTableCell align="right">{album.date}</StyledTableCell>
                  <StyledTableCell align="right">{album.image}</StyledTableCell>
                  <StyledTableCell align="right" sx={{ color: album.isPublished ? 'inherit' : 'red' }}>
                    {album.isPublished ? 'Public' : 'Unpublished'}
                  </StyledTableCell>
                  <StyledTableCell align="right">{album.publisher}</StyledTableCell>
                  <StyledTableCell align="right">
                    {!album.isPublished && (
                      <LoadingButton
                        loading={publishing === album._id}
                        loadingPosition="center"
                        variant="outlined"
                        color="success"
                        onClick={() => onAlbumPublic(album._id)}
                        sx={{ mx: 1 }}
                      >
                        <PublishIcon />
                      </LoadingButton>
                    )}
                    <LoadingButton
                      loading={deleting === album._id}
                      loadingPosition="center"
                      variant="outlined"
                      color="error"
                      onClick={() => onAlbumDelete(album._id)}
                    >
                      <DeleteIcon />
                    </LoadingButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Grid>
  );
};

export default AdminsAlbums;
