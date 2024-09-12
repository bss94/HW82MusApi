import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {Provider} from 'react-redux';
import {store} from './app/store.ts';
import {BrowserRouter} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import {CssBaseline} from '@mui/material';
import 'react-toastify/dist/ReactToastify.min.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer position="bottom-left"/>
        <CssBaseline/>
        <App/>
      </BrowserRouter>
    </Provider>,
  </StrictMode>,
);
