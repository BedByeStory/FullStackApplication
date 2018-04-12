import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {
  BrowserRouter,
  HashRouter,
  withRouter
} from 'react-router-dom'
import { Provider } from 'react-redux';
import { MuiThemeProvider } from 'material-ui/styles';
import createStore from './store';
import bootStore from './store/boot';
import theme from './theme';
import './index.css';

const store = createStore()
const Router = process.env.REACT_APP_CORDOVA ? HashRouter : BrowserRouter
const render = () => ReactDOM.render(
<MuiThemeProvider theme={theme}>
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
</MuiThemeProvider>, document.getElementById('root'));

const deviceReady = v =>
  new Promise((res) => {
    if (process.env.REACT_APP_CORDOVA) {
      document.addEventListener(
        'deviceready',
        () => res(v),
        false
      );
    } else {
      registerServiceWorker();
      res(v);
    }
  });


deviceReady()
.then(() => bootStore(store))
.then(() => render())
.catch(err => {
  console.log(err);
  render();
});
