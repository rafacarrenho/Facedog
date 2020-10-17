import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './Components/Home'
import Login from './Components/Login/Login'
import style from './App.css'
import {UserStorage} from './UserContext'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserStorage>
          <Header />
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
