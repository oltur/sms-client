import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import HomePage from 'components/routes/home/home-page';

export default function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </HashRouter>
  );
}
