import React from 'react';
import {Card, CardContent, Typography} from '@mui/material';
import Grid from '@mui/material/Grid2';

interface Props{
 trackNumber:number;
 title:string;
 time:string;
}

const TrackItem:React.FC<Props> = ({
trackNumber,title,time
}) => {
  return (
    <Card sx={{ textAlign: 'center' }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={1}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {trackNumber}
            </Typography>
          </Grid>
          <Grid size={9}>
            <Typography variant="body2" sx={{ color: 'text.secondary',textAlign: 'left' }}>
              {title}
            </Typography>
          </Grid>
          <Grid size={2}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {time}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TrackItem;