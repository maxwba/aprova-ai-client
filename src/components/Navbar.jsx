import React, { Component } from "react";
import { Link } from "react-router-dom";
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

    this.fetchUser()
  return (
<nav class="navbar navbar-expand-lg navbar-light bg-transparent">
<Link className="logo navbar-brand d-inline-block align-top ml-5 mt-1" exact to="/"> <img src="./images/logo.png"/> </Link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse justify-content-end mr-5" id="navbarNav">
    <ul class="navbar-nav">
    <li class="nav-item active">
    <Link className="btn-login nav-link" to="/login" style={{ color: "gray", fontSize: 20 }}> Login </Link>
    </li>
    </ul>
  </div>
</nav>
  );
}};


export default Navbar;