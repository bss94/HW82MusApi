import React, { MouseEventHandler } from 'react';
import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { API_URL } from '../../constants.ts';
import imageNotFound from '../../assets/images/image-not-found.png';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { LoadingButton } from '@mui/lab';
import DeleteIcon from '@mui/icons-material/Delete';
import { Artist, User } from '../../types.ts';
import { useAppSelector } from '../../app/hooks.ts';
import { selectArtistDeleting } from '../../store/artistsStore/artistsSlice.ts';

interface Props {
  artist: Artist;
  user: User | null;
  deleteArtist: MouseEventHandler;
}

const ArtistItem: React.FC<Props> = ({ artist, user, deleteArtist }) => {
  const deleting = useAppSelector(selectArtistDeleting);
  return (
    <Card sx={{ textAlign: 'center', bgcolor: artist.isPublished ? 'inherit' : 'rgba(186,186,186,0.3)' }}>
      <CardMedia sx={{ height: 250 }} image={artist.photo ? `${API_URL}/${artist.photo}` : imageNotFound} />
      <CardContent sx={{ p: 1 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ textTransform: 'capitalize' }}>
          {artist.name} {!artist.isPublished && '(Unpublished)'}
        </Typography>
        {artist.information && (
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {artist.information}
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <IconButton component={Link} to={`/artist/${artist._id}`}>
          <ArrowForwardIcon />
        </IconButton>
        {!artist.isPublished && (artist.publisher === user?._id || user?.role === 'admin') && (
          <LoadingButton
            loading={deleting === artist._id}
            loadingPosition="center"
            variant="text"
            color="error"
            onClick={deleteArtist}
          >
            <DeleteIcon />
          </LoadingButton>
        )}
      </CardActions>
    </Card>
  );
};

export default ArtistItem;
