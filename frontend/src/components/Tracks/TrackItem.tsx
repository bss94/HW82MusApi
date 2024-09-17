import React, {MouseEventHandler} from 'react';
import {Button, Card, CardContent, Typography} from '@mui/material';
import Grid from '@mui/material/Grid2';
import {User} from '../../types.ts';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

interface Props {
  addToHistory: MouseEventHandler;
  trackNumber: number;
  title: string;
  time: string;
  user: User | null;
}

const TrackItem: React.FC<Props> = ({
  addToHistory, trackNumber, title, time, user
}) => {
  return (
    <Card sx={{textAlign: 'center'}}>
      <CardContent>
        <Grid container>
          {user &&
            <Grid size={1} alignContent={'center'}>
              <Button size="small" sx={{width: '100%', m: 0, p: 0}}
                      onClick={addToHistory}>
                <PlayCircleOutlineIcon/>
              </Button>
            </Grid>
          }
          <Grid size={1} alignContent={'center'}>
            <Typography variant="body2" sx={{color: 'text.secondary'}}>
              {trackNumber}
            </Typography>
          </Grid>
          <Grid size={!user ? 9 : 8} alignContent={'center'}>
            <Typography variant="body2" sx={{color: 'text.secondary', textAlign: 'left'}}>
              {title}
            </Typography>
          </Grid>
          <Grid size={2} alignContent={'center'}>
            <Typography variant="body2" sx={{color: 'text.secondary'}}>
              {time}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TrackItem;