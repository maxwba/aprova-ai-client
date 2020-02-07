import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import AuthService from "./components/auth/auth-service";
import Dashboard from "./components/Dashboard";
import ClientDashboard from "./components/ClientDashboard";
import JobDetail from "./components/JobDetail";
import Renderform from "./components/Renderform";
import ProtectedRoute from "./components/auth/protected-route";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInCompany: null,
      currentClient: {},
      clientSection: {} // <===== novo
    };
    this.service = new AuthService();
    this.getTheUser = this.getTheUser.bind(this);
    this.getTheClient = this.getTheClient.bind(this);
    this.getClientSection = this.getClientSection.bind(this);
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

  getTheClient(clientObj) {
    this.setState({
      currentClient: clientObj
    });
  }

  getClientSection(clientSession){
    this.setState({
      clientSection: clientSession 
    })
  }
  
  render() {
    console.log(this.state.clientSection)
    this.fetchUser();
    return (
      <div className="App">
        {/* If client is loggedIn */}
        {this.state.loggedInCompany ? (
          <Switch>
            <Route exact path="/" component={Home} company={this.props.email} />
            <ProtectedRoute
              path="/dashboard"
              component={Dashboard}
              company={this.state.loggedInCompany}
              getTheClient={this.getTheClient}
              currentClient={this.state.currentClient}
            />
            <Route
              path="/jobdetail"
              component={JobDetail}
              getTheClient={this.getTheClient}
              currentClient={this.state.currentClient}
            />
            <Route
              path="/renderform"
              render={props => (
                <Renderform
                  {...props}
                  batman="babababab"
                  currentClient={this.state.currentClient}
                  clientSection={this.state.clientSection}
                />
              )}
            />
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
            <Route path="/clientdashboard" render={props => <ClientDashboard {...props} getClientSection={this.getClientSection} clientSection={this.state.clientSection}/>}/>
            <Route
              path="/renderform"
              render={props => (
                <Renderform
                  {...props}
                  batman="babababab"
                  currentClient={this.state.currentClient}
                  clientSection={this.state.clientSection}
                />
              )}
            />
          </Switch>
        )}{" "}
      </div>
    );
  }
}

export default App;
