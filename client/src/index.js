
// highlight
import './utils/highlight';

// scroll bar
import 'simplebar/src/simplebar.css';

import 'react-image-lightbox/style.css';

// editor
import 'react-quill/dist/quill.snow.css';


// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';




import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider as ReduxProvider } from 'react-redux';

import store from "./store"

// @mui
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { SettingsProvider } from './contexts/SettingsContext';
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext';


ReactDOM.render(
  <HelmetProvider>
    <ReduxProvider store={store}>
      <SettingsProvider>
        <CollapseDrawerProvider>
        <BrowserRouter>
        <App/>
        </BrowserRouter>
      </CollapseDrawerProvider>
     </SettingsProvider>
   </ReduxProvider>
  </HelmetProvider>,
    document.getElementById('root')

);

