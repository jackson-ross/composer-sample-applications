import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {Route} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App.js';
import AlicePage from './components/Pages/AlicePage/AlicePage.js';
import BobPage from './components/Pages/BobPage/BobPage.js';
import EllaPage from './components/Pages/EllaPage/EllaPage.js';
import MatiasPage from './components/Pages/MatiasPage/MatiasPage.js';
import rootReducer from './reducers/reducers';

let store = createStore(rootReducer);
let rootElement = document.getElementById('root');

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  rootElement
);
