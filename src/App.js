import './App.css';
import Header from './Components/Header/Header'
import Vehicles from './Components/Vehicles/Vehicles';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './Components/Login/Login';
import React, { useState, createContext } from 'react';
import Result from './Components/Result/Result';
import NotFound from './Components/NotFound/NoFound';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <div className="appStyle">
        <Router>
          <Header></Header>
          <Switch>
            <Route path="/home">
              <Vehicles></Vehicles>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <PrivateRoute path="/vehicles/:vehicle">
              <Result></Result>
            </PrivateRoute>
            <Route exact path="/">
              <Vehicles></Vehicles>
            </Route>
            <Route path="*">
               <NotFound></NotFound>
            </Route>
          </Switch>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
