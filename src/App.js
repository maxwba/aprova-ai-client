import React, {
  Component
} from "react";
import "./App.css";
import {
  Switch,
  Route
} from "react-router-dom";

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
    };
    this.service = new AuthService();
    this.getTheUser = this.getTheUser.bind(this);
    this.getTheClient = this.getTheClient.bind(this)
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
    console.log(`Recebi a parada`, clientObj)
    this.setState({
      currentClient:clientObj,
    }, () => console.log(`Gravei a parada`, this.state.currentClient));
  }

  render() {
      this.fetchUser();
      return ( <div className = "App" >

          {/* If client is loggedIn */ } 
          {
            this.state.loggedInCompany ? (

              <Switch >
              <Route exact path = "/" component = {Home} company = {this.props.email}/> 
              <Route exact path = "/clientdashboard" component = {ClientDashboard} /> 
              <ProtectedRoute path = "/dashboard" component = {Dashboard} company = {this.state.loggedInCompany} getTheClient={this.getTheClient} currentClient={this.state.currentClient}/> 
              <Route path = "/jobdetail" component = {JobDetail}/>
              <Route path = "/renderform" render = {props => <Renderform {...props} currentClient = {this.state.currentClient}/>}/> 
              <Route exact path = "/logout" />
              <Route path = "/signup" render = {props => < Signup {...props} getUser = {this.getTheUser}/>} />
              <Route
                path = "/login"
                render = {
                  props => < Login {
                    ...props
                  }
                  getUser = {
                    this.getTheUser
                  }
                  />} />
                  </Switch>
                ): ( <Switch >
                  <Route exact path = "/"
                  component = {
                    Home
                  }
                  company = {
                    this.props.email
                  }
                  /> 
                  <Route path = "/signup"
                  render = {
                    props => < Signup {
                      ...props
                    }
                    getUser = {
                      this.getTheUser
                    }
                    />} />
                    <Route
                    path = "/login"
                    render = {
                      props => < Login {
                        ...props
                      }
                      getUser = {
                        this.getTheUser
                      }
                      />} />
                      </Switch>
                    )
                  } </div>
                );
              }
            }

export default App;