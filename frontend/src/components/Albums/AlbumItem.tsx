import React from 'react';
import {Card, CardContent, CardMedia, Typography} from '@mui/material';
import {API_URL} from '../../constants.ts';
import imageNotFound from '../../assets/images/image-not-found.png';

interface Props{
  title: string;
  image: string|null;
  date:number;

}

const AlbumItem:React.FC<Props> = ({
  title,image,date
}) => {
  return (
    <Card sx={{ maxWidth: 250 , textAlign: 'center' }}>
      <CardMedia
        sx={{ height:200}}
        image={image?`${API_URL}/${image}`:imageNotFound}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {date}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AlbumItem;