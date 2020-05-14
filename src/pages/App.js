import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home';
import Story from './Story';

import Chp1Photo from '../scenes/Chp1Photo';
import Chp1Map from '../scenes/Chp1Map';
import Chp1LakeHood from '../scenes/Chp1LakeHood';
import Chp1Simon from '../scenes/Chp1Simon';
import Chp1TakeOff from '../scenes/Chp1TakeOff';

import Chp2FlightFeelings from '../scenes/Chp2FlightFeelings';
import Chp2Cockpit from '../scenes/Chp2Cockpit';

import Chp3Landing from '../scenes/Chp3Landing';
import Chp3Bear from '../scenes/Chp3Bear';
import Chp3People from '../scenes/Chp3People';

// import NoMatch from './404';
// import Nuages from '../components/Nuages';

import '../scss/basic.scss';

const App = () => (
  <Router>
    <Switch>
      <Route path="/photo" component={Chp1Photo} />
      <Route path="/map" component={Chp1Map} />
      <Route path="/lakehood" component={Chp1LakeHood} />
      <Route path="/simon" component={Chp1Simon} />
      <Route path="/takeoff" component={Chp1TakeOff} />
      <Route path="/flight-feelings" component={Chp2FlightFeelings} />
      <Route path="/cockpit" component={Chp2Cockpit} />
      <Route path="/landing" component={Chp3Landing} />
      <Route path="/bear" component={Chp3Bear} />
      <Route path="/people" component={Chp3People} />
      <Route path="/story" component={Story} />
      <Route path="/" component={Home} />
      {/* <Route path="/*" component={NoMatch} /> */}
      {/* <Route path="/nuages" component={Nuages} /> */}
    </Switch>
  </Router>
);

export default App;
