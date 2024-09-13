import AlbumItem from '../../components/Albums/AlbumItem.tsx';
import Grid from '@mui/material/Grid2';
import {CircularProgress, styled, Typography} from '@mui/material';
import {Link, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {selectAlbums, selectAlbumsFetching} from '../../store/albumsStore/albumsSlice.ts';
import {useEffect} from 'react';
import {fetchAlbums} from '../../store/albumsStore/albumsThunks.ts';

const Albums = () => {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const fetching = useAppSelector(selectAlbumsFetching);
  const albums = useAppSelector(selectAlbums);

  useEffect(() => {
    if (id) {
      dispatch(fetchAlbums(id));
    }
  }, [dispatch]);

  const StyledLink = styled(Link)({
    textDecoration: 'none',
  });
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography component="h1" variant="h5">Title Albums</Typography>
      </Grid>
      {fetching && <Grid size={12}> <CircularProgress sx={{textAlign: 'center'}}/> </Grid>}

      {
        //albums.length > 0 &&
      //   albums.map(album => {
      //   return (
      //     <Grid size={3}>
      //       <StyledLink to={`/tracks/${album._id}`}>
      //         <ArtistItem name={artist.name} photo={artist.photo} information={artist.information}/>
      //       </StyledLink>
      //     </Grid>
      //   );
      // })
      }


      <Grid size={3}>
        <StyledLink to={'/tracks/xxx'}>
          <AlbumItem title={'asdaw'} date={2015} image={null}/>
        </StyledLink>
      </Grid>
      <Grid size={3}>
        <StyledLink to={'/tracks/xxx'}>
          <AlbumItem title={'asdaw'} date={2015} image={null}/>
        </StyledLink>
      </Grid><Grid size={3}>
      <StyledLink to={'/tracks/xxx'}>
        <AlbumItem title={'asdaw'} date={2015} image={null}/>
      </StyledLink>
    </Grid><Grid size={3}>
      <StyledLink to={'/tracks/xxx'}>
        <AlbumItem title={'asdaw'} date={2015} image={null}/>
      </StyledLink>
    </Grid>

    </Grid>
  );
};

export default Albums;