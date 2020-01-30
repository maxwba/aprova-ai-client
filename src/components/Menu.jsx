import React, { Component } from 'react';
import { Link } from "react-router-dom";
//import axios from "axios";

class Menu extends Component {
    constructor(props) {
        super(props);
       /*  this.state = { listOfBeers:[] }
        this.getAllBeers = this.getAllBeers.bind(this); */

    }

/* 
    getAllBeers() {
        axios
          .get(`https://ih-beers-api2.herokuapp.com/beers`)
          .then(responseFromApi => {
            console.log(responseFromApi);
            this.setState({
              listOfBeers: responseFromApi.data
            });
          });
      }
    
      componentDidMount() {
        this.getAllBeers();
      }

 */
    render() { 
        return (
    <div>
        <header>
        <Link className="logo navbar-brand d-inline-block align-top ml-5 mt-1" exact to="/"> <img src="./images/logo.png"/> </Link>
        <input type="checkbox" id="menyAvPaa" />
        <label id="burger" for="menyAvPaa">
        <div></div>
        <div></div>
        <div></div>
        </label>
        <nav id="meny">
        <p>AQUI APARECE TODOS NOSSOS CLIENTES E O BOTÃO PARA CRIAR OUTRO</p>
        </nav>
        </header>
    </div>   
        );
    }
}
 
export default Menu;