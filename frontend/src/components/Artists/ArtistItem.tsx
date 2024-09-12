import React from 'react';
import {Card, CardContent, CardMedia, Typography} from '@mui/material';
import {API_URL} from '../../constants.ts';
import imageNotFound from '../../assets/images/image-not-found.png';


interface Props{
  name:string;
  photo:string | null;
}

const ArtistItem:React.FC<Props> = ({
  name,photo
}) => {
  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardMedia
        sx={{ height:200}}
        image={photo?`${API_URL}/${photo}`:imageNotFound}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ArtistItem;