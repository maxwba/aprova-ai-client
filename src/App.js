import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import AuthService from "./components/auth/auth-service";
import Dashboard from './components/Dashboard';
import JobDetail from './components/JobDetail';


class App extends Component {
  constructor(props){
    super(props)
    this.state = { loggedInUser: null };
    this.service = new AuthService();
    this.getTheUser = this.getTheUser.bind(this);
  }

  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service
        .loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response
          });
        })
        .catch(err => {
          this.setState({
            loggedInUser: false
          });
        });
    }
  }

  getTheUser(userObj) {
    this.setState({
      loggedInUser: userObj
    })
  }
  
  render() {
    this.fetchUser()
    return (
      <div className="App">
        <Switch>
        <Route exact path="/" component={Home}  user={this.props.user} />
        <Route path="/dashboard" component={Dashboard}  user={this.props.user} />
        <Route path="/jobdetail" component={JobDetail} />
        <Route path="/signup" render={(props) => <Signup {...props} getUser={this.getTheUser} />} />
        <Route path="/login"  render={(props) => <Login {...props} getUser={this.getTheUser} />} />
        </Switch>
      </div>
    );
  }
}
export default App; 
