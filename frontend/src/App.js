import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Login from './components/Login';
import Signup from './components/Signup';
import Errorpage from './components/Errorpage';
import Logout from './components/Logout';

import { initialState, reducer } from './reducer/UseReducer';

export const UserContext = createContext();

const Router = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/quiz">
          <Quiz />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path='*'>
          <Errorpage />
        </Route>
      </Switch>
    </>
  )
}


const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);


  return <>
    <UserContext.Provider value={{ state, dispatch }}>
      <Navbar />
      <Router />
    </UserContext.Provider>
  </>
}

export default App;