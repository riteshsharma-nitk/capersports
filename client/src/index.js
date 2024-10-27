
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
import App from './App';
import { Provider as ReduxProvider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';


// redux
import store from "./store"

// @mui
import { BrowserRouter } from 'react-router-dom';
import { SettingsProvider } from './contexts/SettingsContext';
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';




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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

