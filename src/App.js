import React, { Component } from 'react';
import './App.css';
// import { Switch, Route } from 'react-router-dom';;
import Home from './components/Home'

class App extends Component {
  constructor(props){
    super(props)
    this.state = { loggedInUser: null };
  }
  getTheUser(userObj) {
    this.setState({
      loggedInUser: userObj
    })
  }
  render() {
    return (
      <div className="App">
        <Home/>
      </div>
    );
  }
}
export default App; 
