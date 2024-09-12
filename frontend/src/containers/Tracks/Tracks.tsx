import TrackItem from '../../components/Tracks/TrackItem.tsx';
import Grid from '@mui/material/Grid2';
import {Typography} from '@mui/material';


const Tracks = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography component="h1" variant="h5">Title Home</Typography>
      </Grid>
      <Grid size={12}>
        <TrackItem trackNumber={1} title={'asdasdad'} time={"2:15"}/>
      </Grid>
      <Grid size={12}>
        <TrackItem trackNumber={2} title={'asdasdad'} time={"2:15"}/>
      </Grid>
      <Grid size={12}>
        <TrackItem trackNumber={3} title={'asdasdad'} time={"2:15"}/>
      </Grid>
    </Grid>
  );
};

export default Tracks;