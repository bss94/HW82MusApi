import React, {MouseEventHandler} from 'react';
import {Card, CardActions, CardContent, CardMedia, IconButton, Typography} from '@mui/material';
import {API_URL} from '../../constants.ts';
import imageNotFound from '../../assets/images/image-not-found.png';
import {Link} from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';
import {LoadingButton} from '@mui/lab';
import {Album, User} from '../../types.ts';
import {useAppSelector} from '../../app/hooks.ts';
import {selectAlbumDeleting} from '../../store/albumsStore/albumsSlice.ts';

interface Props {
  album: Album;
  user: User | null;
  deleteAlbum: MouseEventHandler;
}

const AlbumItem: React.FC<Props> = ({
  album, user, deleteAlbum,
}) => {
  const deleting = useAppSelector(selectAlbumDeleting);

  return (
    <Card sx={{textAlign: 'center', bgcolor: album.isPublished ? 'inherit' : 'rgba(186,186,186,0.3)'}}>
      <CardMedia
        sx={{height: 250}}
        image={album.image ? `${API_URL}/${album.image}` : imageNotFound}
      />
      <CardContent sx={{p: 1}}>
        <Typography gutterBottom variant="h6" component="div">
          {album.title} {!album.isPublished && '(Unpublished)'}
        </Typography>
        <Typography variant="body2" sx={{color: 'text.secondary'}}>
          {album.date}
        </Typography>
      </CardContent>
      <CardActions sx={{justifyContent: 'space-between', alignItems: 'center'}}>
        <IconButton component={Link} to={`/album/${album._id}`}>
          <ArrowForwardIcon/>
        </IconButton>
        {!album.isPublished && (album.publisher === user?._id || user?.role === 'admin') &&
          <LoadingButton
            loading={deleting === album._id}
            loadingPosition="center"
            variant="text"
            color="error"
            onClick={deleteAlbum}
          >
            <DeleteIcon/>
          </LoadingButton>
        }
      </CardActions>
    </Card>
  );
};

export default AlbumItem;