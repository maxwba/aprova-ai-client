import React from "react";
import Axios from "axios"



export default function DefaultPage(props) {
  const [company, handleCompany] = React.useState([]);
  const [task, handleTask] = React.useState([]);

  function getAllClient() {
    Axios.get(process.env.REACT_APP_API_URL + "/client", {
      withCredentials: true
    }).then(responseFromApi => {
      handleCompany(responseFromApi.data);
    }).catch(error => console.log(error))
  } 

  function getAllTasks() {
    Axios.get(process.env.REACT_APP_API_URL + "/task", {
      withCredentials: true
    }).then(responseFromApi => {
      handleTask(responseFromApi.data);
    }).catch(error => console.log(error))
  } 
  
  React.useEffect(() => {
    if (company) {
      getAllClient();
      getAllTasks();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  
  
    return (
      <>
      <div className="name">
            <h1>Bem vindo, </h1>
          </div>
      <div className="steps d-flex row justify-content-around mb-5  mx-3">
      <div className="about1 col-xs-12 col-md-3">
        <img className="img-fluid" src="./images/contact.png" style={{ width: 90 }} alt="contact"/>
        <br/>
        <br/> 
        <p>Você tem <span className="span">{company.length} </span> clientes cadastrados</p>
      </div>

      <div className="about1 col-xs-12 col-md-3">
        <img className="img-fluid" src="./images/check.png" style={{ width: 90 }} alt="contact"/>
        <br/>
        <br/> 
        <p>E <span className="span">{task.length} </span> formulários pendentes de aprovação</p>
        </div>
    </div>
    </>
    );
  };
  

  