import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';

class Signup extends Component {
    constructor(props) {
      super(props);
      this.state = { email: "", password: "", message: "" };
      this.service = new AuthService();
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }
    handleFormSubmit(event) {
      event.preventDefault();
      const email = this.state.email;
      const password = this.state.password;
      this.service
        .signup(email, password)
        .then(user => {
          this.setState({
            email: "",
            password: ""
          });
          this.props.getUser(user);
          // this.props.history.push("/projects"); <=== Nao sei o que isso faz
        })
        .catch(error => {
          this.setState({
            message: error.response.data.message
          });
        });
    }
    handleChange(event) {
      const { name, value } = event.target;
      this.setState({ [name]: value });
    }

    render() {
      console.log(this.props);
      return (
        <div>
          <form onSubmit={this.handleFormSubmit}>
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <input type="submit" value="Signup" />
          </form>
          {this.state.message && <p>{this.state.message}</p>} {/* ESTILIZAR E COLOCAR NO LOGI */}
          <p>
            Already have account?
            <Link to={"/"}> Login</Link>
          </p>
        </div>
      );
    }
  }
  export default Signup;
  
  