import React from 'react';
import {Card, CardContent, CardMedia, Typography} from '@mui/material';
import {API_URL} from '../../constants.ts';
import imageNotFound from '../../assets/images/image-not-found.png';


interface Props {
  name: string;
  information?: string;
  photo: string | null;
}

const ArtistItem: React.FC<Props> = ({
  name, photo, information
}) => {
  return (
    <Card sx={{textAlign: 'center'}}>
      <CardMedia
        sx={{height: 200}}
        image={photo ? `${API_URL}/${photo}` : imageNotFound}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{textTransform: 'capitalize'}}>
          {name}
        </Typography>
        {information &&
          <Typography variant="body2" sx={{color: 'text.secondary'}}>
            {information}
          </Typography>}

      </CardContent>
    </Card>
  );
};

export default ArtistItem;