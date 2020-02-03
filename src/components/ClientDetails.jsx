import React from "react";
import { Link } from "react-router-dom";

export default function ClienteDetails(props) {
  const { selectedClient } = props


  console.log(selectedClient)

  return (
    <div>
      <br />
      <h1> {selectedClient.name} </h1>
      <br />
      <Link to={selectedClient.shareLink}>LINK PARA CLIENTE</Link>
      <br />
      <br />
    </div>
  );
}
