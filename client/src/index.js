

// scroll bar
import 'simplebar/src/simplebar.css';
import 'react-image-lightbox/style.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';




import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux"
import store from "./store"
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { SettingsProvider } from './contexts/SettingsContext';
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext';




import { StyledEngineProvider } from '@mui/material/styles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
   <HelmetProvider>
     <StyledEngineProvider injectFirst>
      <SettingsProvider>
        <CollapseDrawerProvider>
      <BrowserRouter>
      <App/>
      </BrowserRouter>
      </CollapseDrawerProvider>
      </SettingsProvider>
   
    </StyledEngineProvider>
    </HelmetProvider>
   </Provider>
);

