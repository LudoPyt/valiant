import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Story from './Story';
import Alaska from '../components/Alaska';
import Alaska1 from '../components/Alaska1';
import Alaska2 from '../components/Alaska2';
import Alaska3 from '../components/Alaska3';
import NoMatch from './404';

import '../scss/basic.scss';

const App = () => (
  <Router>
    <Switch>
      <Route path="/story0" component={Alaska} />
      <Route path="/story1" component={Alaska1} />
      <Route path="/story2" component={Alaska2} />
      <Route path="/story3" component={Alaska3} />
      <Route path="/story" component={Story} />
      <Route path="/" component={Home} />
      <Route path="*" component={NoMatch} />
    </Switch>
  </Router>
);

export default App;
