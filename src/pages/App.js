import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Story from './Story';
import AlaskaSimon from '../components/AlaskaSimon';
import AlaskaTakeOff from '../components/AlaskaTakeOff';
import AlaskaFlightFeelings from '../components/AlaskaFlightFeelings';
import Alaska3 from '../components/Alaska3';
import AlaskaLanding from '../components/AlaskaLanding';
import NoMatch from './404';
// import Nuages from '../components/Nuages';

import '../scss/basic.scss';

const App = () => (
  <Router>
    <Switch>
      <Route path="/simon" component={AlaskaSimon} />
      <Route path="/takeoff" component={AlaskaTakeOff} />
      <Route path="/flight-feelings" component={AlaskaFlightFeelings} />
      <Route path="/story3" component={Alaska3} />
      <Route path="/landing" component={AlaskaLanding} />
      <Route path="/story" component={Story} />
      <Route path="/" component={Home} />
      <Route path="*" component={NoMatch} />
      {/* <Route path="/nuages" component={Nuages} /> */}
    </Switch>
  </Router>
);

export default App;
