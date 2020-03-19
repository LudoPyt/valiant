import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './Home';
import Story from './Story';

const App = () => (
  <Router>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/story">
          <Story />
        </Route>
      </Switch>
  </Router>
);

export default App;
