import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from "react-router-dom"
import home from "./page/home"
import login from "./page/login"
import register from "./page/register"
import forgotpassword from "./page/forgot"
import change from "./page/password"
import card from "./component/card"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" component={home} exact />
          <Route path="/login" component={login} />
          <Route path="/register" component={register} />
          <Route path="/forgot" component={forgotpassword} />
          <Route path="/password" component={change} />
          <Route path="/card" component={card} />
        </Switch>
      </div>
    )
  }
}


export default App;
