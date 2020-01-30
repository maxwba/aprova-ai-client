import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";


const Home = () => {

  return (
    <div>
      <Navbar />
      <div className="slogan d-flex row justify-content-around mb-5  mx-3">
        <div className="col-xs-12 col-md-6">
        <h1>Solicite, prove e crie briefings personalizados</h1>
        </div>
        <div className="d-flex flex-column col-xs-12 col-md-4">
          <p>Plataforma completa para gestão de aprovação de serviços</p>
          <Link className="myButton" to="/signup" style={{ textDecoration: "none", color: "white" }}>Começar</Link>
        </div>
      </div>
      <div className="steps d-flex row justify-content-around mb-5  mx-3">
        <div className="about col-xs-12 col-md-3">
          <img className="img-fluid" src="./images/contact.png" style={{ width: 90 }} alt="contact"/>
          <br/>
          <br/> 
          <p>Cadastre seus clientes e crie um acesso único para eles</p>
        </div>

        <div className="about col-xs-12 col-md-3">
          <img className="img-fluid" src="./images/recycle.png" style={{ width: 90 }} alt="contact"/>
          <br/>
          <br/> 
          <p>Crie um formulário especializado e envie para o cliente</p>
        </div>

        <div className="about col-xs-12 col-md-3">
          <img className="img-fluid" src="./images/check.png" style={{ width: 90 }} alt="contact"/>
          <br/>
          <br/> 
          <p>Agora seu cliente pode te enviar jobs e você pode aprová-los ou rejeitá-los</p>
        </div>
      </div>
      <footer className="foot">
    <div className="footer__text">
      <p>® 2020 Aprova aí Labs, Inc</p>
    </div>
    <div className="footer__icons">
      <img src="/images/instagram.png" alt="instagram icon"  width="38" height="37"/>
      <img src="/images/facebook.png" alt="facebook icon"  width="38" height="37"/>
    </div>
  </footer>
    </div>
  );
};

export default Home;
