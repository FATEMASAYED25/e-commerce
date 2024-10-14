import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import App from './App';

serviceWorkerRegistration.register(); // by default it will be serviceWorkerRegistration.unregister();


ReactDOM.render(
< Router>
<App/>

 </ Router>,
  document.getElementById('root')
 );


