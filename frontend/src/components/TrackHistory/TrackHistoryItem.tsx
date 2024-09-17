import React from 'react';
import {Card, CardContent, Typography} from '@mui/material';
import Grid from '@mui/material/Grid2';
import dayjs from 'dayjs';


interface Props {
  title: string;
  artist: string;
  date: string;
}

const TrackHistoryItem: React.FC<Props> = ({title, artist, date}) => {
  const setDate = (date: string) => {
    const currentDate = new Date().toISOString();
    if (dayjs(date).format('DD.MM.YYYY') === dayjs(currentDate).format('DD.MM.YYYY')) {
      return 'Today ' + dayjs(date).format('HH:mm');
    } else if (dayjs(date).format('MM.YYYY') === dayjs(currentDate).format('MM.YYYY')
      && (parseFloat(dayjs(currentDate).format('DD')) - parseFloat(dayjs(date).format('DD'))) === 1) {
      return 'Yesterday ' + dayjs(date).format('HH:mm');
    } else if (dayjs(date).format('YYYY') === dayjs(currentDate).format('YYYY')) {
      return dayjs(date).format('DD.MM HH:mm');
    } else return dayjs(date).format('DD.MM.YYYY HH:mm');
  };
  return (
    <Card sx={{textAlign: 'center'}}>
      <CardContent>
        <Grid container>
          <Grid size={3} alignContent={'center'}>
            <Typography variant="body2" sx={{color: 'text.secondary'}}>
              {artist}
            </Typography>
          </Grid>
          <Grid size={7} alignContent={'center'}>
            <Typography variant="body2" sx={{color: 'text.secondary', textAlign: 'left'}}>
              {title}
            </Typography>
          </Grid>
          <Grid size={2} alignContent={'center'}>
            <Typography variant="body2" sx={{color: 'text.secondary'}}>
              {setDate(date)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TrackHistoryItem;