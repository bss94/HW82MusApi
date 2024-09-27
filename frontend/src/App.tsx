import Layout from './components/UI/Layout/Layout.tsx';
import {Route, Routes} from 'react-router-dom';
import {Typography} from '@mui/material';
import Home from './containers/Home/Home.tsx';
import Albums from './containers/Albums/Albums.tsx';
import Tracks from './containers/Tracks/Tracks.tsx';
import Register from './components/Users/Register.tsx';
import Login from './components/Users/Login.tsx';
import TrackHistory from './containers/TrackHistory/TrackHistory.tsx';
import ProtectedRoute from './components/UI/ProtectedRoute/ProtectedRoute.tsx';
import {useAppSelector} from './app/hooks.ts';
import {selectUser} from './store/usersStore/usersSlice.ts';
import ArtistForm from './components/Artists/ArtistForm.tsx';
import AlbumForm from './components/Albums/AlbumForm.tsx';
import TrackForm from './components/Tracks/TrackForm.tsx';
import Admins from './containers/Admins/Admins.tsx';
import AdminsArtists from './components/Admins/AdminsArtists.tsx';
import AdminsAlbums from './components/Admins/AdminsAlbums.tsx';
import AdminsTracks from './components/Admins/AdminsTracks.tsx';


const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/artist/:id" element={<Albums/>}/>
        <Route path="/album/:id" element={<Tracks/>}/>
        <Route path="/new-artist" element={
          <ProtectedRoute isAllowed={user !== null}>
            <ArtistForm/>
          </ProtectedRoute>}/>
        <Route path="/new-album" element={
          <ProtectedRoute isAllowed={user !== null}>
            <AlbumForm user={user}/>
          </ProtectedRoute>}/>
        <Route path="/new-track" element={
          <ProtectedRoute isAllowed={user !== null}>
            <TrackForm user={user}/>
          </ProtectedRoute>}/>
        <Route path="/admins" element={
          <ProtectedRoute isAllowed={user && user.role === 'admin'}>
            <Admins/>
          </ProtectedRoute>}>
          <Route
            path="artists"
            element={<AdminsArtists/>}
          />
          <Route
            path="albums"
            element={<AdminsAlbums/>}
          />
          <Route
            path="tracks"
            element={<AdminsTracks/>}
          />

        </Route>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/track_history" element={<TrackHistory/>}/>
        <Route path="*" element={<Typography variant="h1">Not found</Typography>}/>
      </Routes>
    </Layout>
  );
};

export default App;
