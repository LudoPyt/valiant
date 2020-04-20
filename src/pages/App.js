import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Story from './Story';
import AlaskaSimon from '../components/AlaskaSimon';
import AlaskaTakeOff from '../components/AlaskaTakeOff';
import Alaska3 from '../components/Alaska3';
import NoMatch from './404';
// import Nuages from '../components/Nuages';

import '../scss/basic.scss';

const App = () => (
  <Router>
    <Switch>
      <Route path="/simon" component={AlaskaSimon} />
      <Route path="/takeoff" component={AlaskaTakeOff} />
      <Route path="/story3" component={Alaska3} />
      <Route path="/story" component={Story} />
      <Route path="/" component={Home} />
      <Route path="*" component={NoMatch} />
      {/* <Route path="/nuages" component={Nuages} /> */}
    </Switch>
  </Router>
);

export default App;
