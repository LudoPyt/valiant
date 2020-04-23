import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Story from './Story';
import Chp1Simon from '../scenes/Chp1Simon';
import Chp1TakeOff from '../scenes/Chp1TakeOff';
import Chp2FlightFeelings from '../scenes/Chp2FlightFeelings';
import Alaska3 from '../components/Alaska3';
import Chp3Landing from '../scenes/Chp3Landing';
import NoMatch from './404';
// import Nuages from '../components/Nuages';

import '../scss/basic.scss';

const App = () => (
  <Router>
    <Switch>
      <Route path="/simon" component={Chp1Simon} />
      <Route path="/takeoff" component={Chp1TakeOff} />
      <Route path="/flight-feelings" component={Chp2FlightFeelings} />
      <Route path="/story3" component={Alaska3} />
      <Route path="/landing" component={Chp3Landing} />
      <Route path="/story" component={Story} />
      <Route path="/" component={Home} />
      <Route path="*" component={NoMatch} />
      {/* <Route path="/nuages" component={Nuages} /> */}
    </Switch>
  </Router>
);

export default App;
