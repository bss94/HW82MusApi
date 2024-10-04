import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {Provider} from 'react-redux';
import {persistor, store} from './app/store.ts';
import {BrowserRouter} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import {CssBaseline} from '@mui/material';
import 'react-toastify/dist/ReactToastify.min.css';
import {PersistGate} from 'redux-persist/integration/react';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {GOOGLE_CLIENT_ID} from './constants.ts';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <ToastContainer position="bottom-left"/>
            <CssBaseline/>
            <App/>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
