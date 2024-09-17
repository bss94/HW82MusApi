import Layout from './components/UI/Layout/Layout.tsx';
import {Route, Routes} from 'react-router-dom';
import {Typography} from '@mui/material';
import Home from './containers/Home/Home.tsx';
import Albums from './containers/Albums/Albums.tsx';
import Tracks from './containers/Tracks/Tracks.tsx';
import Register from './components/Users/Register.tsx';
import Login from './components/Users/Login.tsx';


const App = () => {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/artist/:id" element={<Albums/>}/>
        <Route path="/album/:id" element={<Tracks/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<Typography variant="h1">Not found</Typography>}/>
      </Routes>
    </Layout>
  )
};

export default App
