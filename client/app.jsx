import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import EnterURL from './components/EnterURL.jsx';
import Styling from './components/Styling.jsx';

const App = () => {
  return (
  <Router>
    <Switch>
      <Route exact path='/'>
        <EnterURL />
      </Route>
      <Route path='/style'>
        <Styling />
      </Route>
    </Switch>
  </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));