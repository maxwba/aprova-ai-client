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
            //message: error.response.data.message
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

          <div class="field">
  <label class="label">Name</label>
  <div class="control">
    <input class="input" type="text" placeholder="Text input"/>
  </div>
</div>

<div class="field">
  <label class="label">Username</label>
  <div class="control has-icons-left has-icons-right">
    <input class="input is-success" type="text" placeholder="Text input" value="bulma"/>
    <span class="icon is-small is-left">
      <i class="fas fa-user"></i>
    </span>
    <span class="icon is-small is-right">
      <i class="fas fa-check"></i>
    </span>
  </div>
  <p class="help is-success">This username is available</p>
</div>

<div class="field">
  <label class="label">Email</label>
  <div class="control has-icons-left has-icons-right">
    <input class="input is-danger" type="email" placeholder="Email input" value="hello@" />
    <span class="icon is-small is-left">
      <i class="fas fa-envelope"></i>
    </span>
    <span class="icon is-small is-right">
      <i class="fas fa-exclamation-triangle"></i>
    </span>
  </div>
  <p class="help is-danger">This email is invalid</p>
</div>

<div class="field">
  <label class="label">Subject</label>
  <div class="control">
    <div class="select">
      <select>
        <option>Select dropdown</option>
        <option>With options</option>
      </select>
    </div>
  </div>
</div>

<div class="field">
  <label class="label">Message</label>
  <div class="control">
    <textarea class="textarea" placeholder="Textarea"></textarea>
  </div>
</div>






</div>



        
      );
    }
  }
  export default Signup;
  
  