import React, { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

export default function ClienteDetails(props) {
  const { selectedClient } = props;

  function deleteProject() {
    axios
      .delete(`http://localhost:5000/api/client/${selectedClient._id}`, {
        withCredentials: true
      })
      .then(() => {
        props.handleDeleteClient();
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div>
      <br />
      <h1> {selectedClient.name} </h1>

      <br />
      <Link to={selectedClient.shareLink}>LINK PARA CLIENTE</Link>
      <br />
      <br />
      <Link to="/renderform"> Mostrar formulários </Link>
      <br />
      <br />
      <button onClick={deleteProject}> Deletar Cliente</button>
    </div>
  );
}
