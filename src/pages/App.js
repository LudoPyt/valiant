import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home';
import Story from './Story';

import Chp1Context from '../scenes/Chp1Context';
import Chp1LakeHood from '../scenes/Chp1LakeHood';
import Chp1Simon from '../scenes/Chp1Simon';

import Chp2TakeOff from '../scenes/Chp2TakeOff';
import Chp2FlightFeelings from '../scenes/Chp2FlightFeelings';
import Chp2Cockpit from '../scenes/Chp2Cockpit';

import Chp3Landing from '../scenes/Chp3Landing';
import Chp3Bear from '../scenes/Chp3Bear';
import Chp3People from '../scenes/Chp3People';

import Header from '../components/Header';
import Timeline from '../components/Timeline';

// import NoMatch from './404';
// import Nuages from '../components/Nuages';

import '../scss/basic.scss';

const App = () => (
  <>
    <Header />

    <Router>
      <Switch>
        <Route exact path="/context" component={Chp1Context} />
        <Route exact path="/lakehood" component={Chp1LakeHood} />
        <Route exact path="/simon" component={Chp1Simon} />
        <Route exact path="/takeoff" component={Chp2TakeOff} />
        <Route exact path="/flight-feelings" component={Chp2FlightFeelings} />
        <Route exact path="/cockpit" component={Chp2Cockpit} />
        <Route exact path="/landing" component={Chp3Landing} />
        <Route exact path="/bear" component={Chp3Bear} />
        <Route exact path="/people" component={Chp3People} />
        <Route exact path="/story" component={Story} />
        <Route exact path="/" component={Home} />
        {/* <Route path="/*" component={NoMatch} /> */}
        {/* <Route path="/nuages" component={Nuages} /> */}
      </Switch>
    </Router>

    <Timeline />
  </>
);

export default App;
