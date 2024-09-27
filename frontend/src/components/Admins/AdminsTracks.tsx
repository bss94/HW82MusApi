import Grid from '@mui/material/Grid2';
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import {StyledTableCell, StyledTableRow} from './AdminsArtists.tsx';
import {LoadingButton} from '@mui/lab';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {useEffect} from 'react';
import {toast} from 'react-toastify';
import {
  selectTrackDeleting,
  selectTrackPublished,
  selectTracks,
  selectTracksFetching
} from '../../store/tracksStore/tracksSlice.ts';
import {deleteTrack, fetchTracks, toggleTrackPublic} from '../../store/tracksStore/tracksThunks.ts';

const AdminsTracks = () => {
  const dispatch = useAppDispatch();
  const fetching = useAppSelector(selectTracksFetching);
  const tracks = useAppSelector(selectTracks);
  const deleting = useAppSelector(selectTrackDeleting);
  const publishing = useAppSelector(selectTrackPublished);

  useEffect(() => {
    dispatch(fetchTracks());
  }, [dispatch]);

  const onTrackDelete = async (id: string) => {
    try {
      await dispatch(deleteTrack(id)).unwrap();
      toast.success('Track delete successfully');
      dispatch(fetchTracks());
    } catch (e) {
      toast.error('Something wrong' + (e as Error).message);
    }
  };
  const onTrackPublic = async (id: string) => {
    try {
      await dispatch(toggleTrackPublic(id));
      toast.success('Track published successfully');
      dispatch(fetchTracks());
    } catch (e) {
      toast.error('Something wrong' + (e as Error).message);
    }
  };

  return (
    <Grid size={12}>
      <Grid size={12}>
        <Typography component="h1" variant="h6" sx={{my: 2}}>Track Table</Typography>
      </Grid>
      {fetching ? <Grid size={12} sx={{textAlign: 'center'}}>
          <CircularProgress/>
        </Grid>
        :
        <TableContainer component={Paper}>
          <Table sx={{minWidth: '100%'}}>
            <TableHead color="primary">
              <TableRow>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell align="right">Album</StyledTableCell>
                <StyledTableCell align="right">Time</StyledTableCell>
                <StyledTableCell align="right">Track number</StyledTableCell>
                <StyledTableCell align="right">isPublished</StyledTableCell>
                <StyledTableCell align="right">Publisher</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tracks.map((track) => (
                <StyledTableRow key={track._id}>
                  <StyledTableCell component="th" scope="row">
                    {track.title}
                  </StyledTableCell>
                  <StyledTableCell align="right">{track.album}</StyledTableCell>
                  <StyledTableCell align="right">{track.time}</StyledTableCell>
                  <StyledTableCell align="right">{track.trackNumber}</StyledTableCell>
                  <StyledTableCell align="right"
                                   sx={{color: track.isPublished ? 'inherit' : 'red'}}>{track.isPublished ? 'Public' : 'Unpublished'}</StyledTableCell>
                  <StyledTableCell align="right">{track.publisher}</StyledTableCell>
                  <StyledTableCell align="right">
                    {!track.isPublished
                      &&
                      <LoadingButton
                        loading={publishing === track._id}
                        loadingPosition="center"
                        variant="outlined"
                        color="success"
                        onClick={() => onTrackPublic(track._id)}
                        sx={{mx: 1}}
                      >
                        <PublishIcon/>
                      </LoadingButton>
                    }
                    <LoadingButton
                      loading={deleting === track._id}
                      loadingPosition="center"
                      variant="outlined"
                      color="error"
                      onClick={() => onTrackDelete(track._id)}
                    >
                      <DeleteIcon/>
                    </LoadingButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </Grid>
  );
};

export default AdminsTracks;