import React, { MouseEventHandler } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Track, User } from '../../types.ts';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { LoadingButton } from '@mui/lab';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppSelector } from '../../app/hooks.ts';
import { selectTrackDeleting } from '../../store/tracksStore/tracksSlice.ts';

interface Props {
  track: Track;
  addToHistory: MouseEventHandler;
  deleteTrack: MouseEventHandler;
  user: User | null;
}

const TrackItem: React.FC<Props> = ({ addToHistory, user, track, deleteTrack }) => {
  const deleting = useAppSelector(selectTrackDeleting);
  return (
    <Card sx={{ textAlign: 'center', bgcolor: track.isPublished ? 'inherit' : 'rgba(186,186,186,0.3)' }}>
      <CardContent>
        <Grid container>
          {user && (
            <Grid size={1} alignContent={'center'}>
              <Button size="small" sx={{ width: '100%', m: 0, p: 0 }} onClick={addToHistory}>
                <PlayCircleOutlineIcon />
              </Button>
            </Grid>
          )}
          <Grid size={1} alignContent={'center'}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {track.trackNumber}
            </Typography>
          </Grid>
          <Grid size={!user ? 9 : 8} alignContent={'center'}>
            <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'left' }}>
              {track.title} {!track.isPublished && '(Unpublished)'}
            </Typography>
          </Grid>
          <Grid size={1} alignContent={'center'}>
            {!track.isPublished && (track.publisher === user?._id || user?.role === 'admin') && (
              <LoadingButton
                loading={deleting === track._id}
                loadingPosition="center"
                variant="contained"
                color="error"
                onClick={deleteTrack}
              >
                <DeleteIcon />
              </LoadingButton>
            )}
          </Grid>
          <Grid size={1} alignContent={'center'}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {track.time}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TrackItem;
