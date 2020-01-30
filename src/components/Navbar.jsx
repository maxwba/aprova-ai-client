import React, { Component } from "react";
import { NavLink, Link, Nav, NavDropdown} from "react-router-dom";
import AuthService from "./auth/auth-service";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loggedInUser: null
        };
        this.service = new AuthService();
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

    componentDidUpdate(prevProps) {
        if (this.props.userInSession !== prevProps.userInSession) {
          this.setState({ loggedInUser: this.props.userInSession });
        }
      }
   
    logoutUser() {
        this.service
          .logout()
          .then(() => {
            this.setState({ loggedInUser: null });
            this.props.getUser(null);
          })
          .catch(error => console.log(error));
      }
   
render () {
    console.log(this.props.loggedInUser)
    this.fetchUser()
  return (
<nav class="navbar navbar-expand-lg navbar-light bg-light">
<Link className="navbar-brand" exact to="/"> <img src="./images/logo.png" style={{width: 100, heigth:50}}/> </Link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
    <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
      <Link className="nav-link" exact to="/signup" style={{ color: "black" }}> Sign up </Link>
      </li>
      <li class="nav-item">
      <Link className="nav-link" to="/login" style={{ color: "black" }}> Login </Link>
      </li>
    </ul>
  </div>
</nav>
  );
}};

export default Navbar;
