import React, {PropsWithChildren} from 'react';
import AppToolbar from '../AppToolbar/AppToolbar.tsx';
import {Container} from '@mui/material';

const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <>
      <header>
        <AppToolbar/>
      </header>
      <Container maxWidth="lg" component="main">
        {children}
      </Container>
    </>
  );
};

export default Layout;