import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './Home';
import Story from './Story';
import Alaska1 from '../components/Alaska1';

const App = () => (
  <Router>
      <Switch>
      <Route path="/story/1">
          <Alaska1 />
        </Route>
        <Route path="/story">
          <Story />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
  </Router>
);

export default App;
