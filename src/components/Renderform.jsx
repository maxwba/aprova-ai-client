import React, { useEffect, useState } from "react";
import Axios from "axios";
import { withTheme } from "react-jsonschema-form";
import { Theme as MuiTheme } from "rjsf-material-ui";
import { Container, Typography, Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const RenderForm = props => {
  const { currentClient } = props;
  const [forms, handleForm] = useState([]);
  const Form = withTheme(MuiTheme);

  console.log(props)

  // Method for capturing inputs
  const handleSubmit = ({ formData }) => {
    // Task post
    Axios.post(
      process.env.REACT_APP_API_URL + "/task",
      // eslint-disable-next-line no-restricted-globals
      { properties: formData, clientId: props.currentClient._id, aproval: 'Aguardando aprovação' },
      { withCredentials: true }
    )
      .then(data => {
        console.log(data)
      })
      .catch(error => console.log(error));
  };


  //Get Form detail
  useEffect(() => {
    Axios.get(process.env.REACT_APP_API_URL + "/form").then(responseFromApi => {
      const newForm = responseFromApi.data.map(prop => {
        console.log(`====> chegou ate o response`,responseFromApi)
        console.log(`=====> esse e o currentc`,currentClient._id)
        console.log(`=====> esse e o propclient`,prop.clientId)
        if (
          currentClient._id === prop.clientId ||
          prop._id === props.location.pathname.split("/")[2] 
        ) {
          console.log(`====> chegou ate o response`,prop.properties)
          const { properties } = prop;
          return {
            ...properties
          };
        }
      });
      handleForm(newForm.filter(a => a !== undefined));
    });
  }, []);


  return (
    <div>
      <Link
          className="logo navbar-brand d-inline-block align-top ml-5 mt-1"
          exact
          to="/"
        >

          <img src="../images/logo.png" alt=""/> 
        </Link>

    <div className="renderForm">
    <Container>

      <Typography variant="h3">{currentClient.name}</Typography>
   

      {forms.length > 0 &&
        forms.map(form => {
          const formSchema = {
            // description: "User cria para empresa responder",
            // type: "string",
            properties: form
          };
          return <Form schema={formSchema} onSubmit={handleSubmit} />;
        })}    
        <button class="btnBack" onClick={props.history.goBack}>Voltar</button>

    </Container>
        </div> 

    </div>
  );
};

export default RenderForm;
