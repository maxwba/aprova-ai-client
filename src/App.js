import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import AuthService from "./components/auth/auth-service";
import Dashboard from "./components/Dashboard";
import JobDetail from "./components/JobDetail";
import ProtectedRoute from "./components/auth/protected-route";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInCompany: null };
    this.service = new AuthService();
    this.getTheUser = this.getTheUser.bind(this);
  }

  fetchUser() {
    if (this.state.loggedInCompany === null) {
      this.service
        .loggedin()
        .then(response => {
          this.setState({
            loggedInCompany: response
          });
        })
        .catch(err => {
          this.setState({
            loggedInCompany: false
          });
        });
    }
  }

  getTheUser(companyObj) {
    this.setState({
      loggedInCompany: companyObj
    });
  }

  render() {
    this.fetchUser();
    return (
      <div className="App">
        {this.state.loggedInCompany ? (
          <Switch>
            <Route exact path="/" component={Home} company={this.props.email} />
            <ProtectedRoute
              path="/dashboard"
              component={Dashboard}
              company={this.state.loggedInCompany}
            />
            <Route path="/jobdetail" component={JobDetail} />
            <Route exact path="/logout" />
            <Route
              path="/signup"
              render={props => <Signup {...props} getUser={this.getTheUser} />}
            />
            <Route
              path="/login"
              render={props => <Login {...props} getUser={this.getTheUser} />}
            />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={Home} company={this.props.email} />
            <Route
              path="/signup"
              render={props => <Signup {...props} getUser={this.getTheUser} />}
            />
            <Route
              path="/login"
              render={props => <Login {...props} getUser={this.getTheUser} />}
            />
            {/* <ProtectedRoute path="/dashboard" component={Dashboard}  company={this.state.loggedInCompany} /> */}
          </Switch>
        )}
      </div>
    );
  }
}
export default App;
