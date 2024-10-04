import {
  CircularProgress,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import {
  selectArtistDeleting,
  selectArtists,
  selectArtistsFetching,
  selectPublishArtist,
} from '../../store/artistsStore/artistsSlice.ts';
import { useEffect } from 'react';
import { deleteArtist, fetchArtists, toggleArtistPublic } from '../../store/artistsStore/artistsThunks.ts';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';
import { LoadingButton } from '@mui/lab';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const AdminsArtists = () => {
  const dispatch = useAppDispatch();
  const fetching = useAppSelector(selectArtistsFetching);
  const artists = useAppSelector(selectArtists);
  const deleting = useAppSelector(selectArtistDeleting);
  const publishing = useAppSelector(selectPublishArtist);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const onArtistDelete = async (id: string) => {
    try {
      await dispatch(deleteArtist(id)).unwrap();
      toast.success('Artist delete successfully');
      dispatch(fetchArtists());
    } catch (e) {
      toast.error('Something wrong' + (e as Error).message);
    }
  };
  const onArtistPublic = async (id: string) => {
    try {
      await dispatch(toggleArtistPublic(id));
      toast.success('Artist published successfully');
      dispatch(fetchArtists());
    } catch (e) {
      toast.error('Something wrong' + (e as Error).message);
    }
  };

  return (
    <Grid size={12}>
      <Grid size={12}>
        <Typography component="h1" variant="h6" sx={{ my: 2 }}>
          Artists Table
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
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Information</StyledTableCell>
                <StyledTableCell align="right">Photo</StyledTableCell>
                <StyledTableCell align="right">isPublished</StyledTableCell>
                <StyledTableCell align="right">Publisher</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {artists.map((artist) => (
                <StyledTableRow key={artist._id}>
                  <StyledTableCell component="th" scope="row">
                    {artist.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{artist.information}</StyledTableCell>
                  <StyledTableCell align="right">{artist.photo}</StyledTableCell>
                  <StyledTableCell align="right" sx={{ color: artist.isPublished ? 'inherit' : 'red' }}>
                    {artist.isPublished ? 'Public' : 'Unpublished'}
                  </StyledTableCell>
                  <StyledTableCell align="right">{artist.publisher}</StyledTableCell>
                  <StyledTableCell align="right">
                    {!artist.isPublished && (
                      <LoadingButton
                        loading={publishing === artist._id}
                        loadingPosition="center"
                        variant="outlined"
                        color="success"
                        onClick={() => onArtistPublic(artist._id)}
                        sx={{ me: 1 }}
                      >
                        <PublishIcon />
                      </LoadingButton>
                    )}
                    <LoadingButton
                      loading={deleting === artist._id}
                      loadingPosition="center"
                      variant="outlined"
                      color="error"
                      onClick={() => onArtistDelete(artist._id)}
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

export default AdminsArtists;
