import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Errorpage from './components/Errorpage';
import Signout from './components/Signout';

const App = () =>{
  return <>
    <Navbar />
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>  
      <Route path="/register">
        <Signup />
      </Route>
      <Route path="/quiz">
        <Quiz/>
      </Route>
      <Route path="/signout">
        <Signout/>
      </Route>
      <Route path = '*'>
        <Errorpage />
      </Route>
    </Switch>
  </>
}

export default App;