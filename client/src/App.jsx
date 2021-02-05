import './App.css';
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Nav from './components/Nav';
import Todo from './components/Todo';
import LoginRegister from './components/LoginRegister';

function App() {
  return (
    <div>
      <Nav />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Todo} />
          <Route path="/profile" component={LoginRegister} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
