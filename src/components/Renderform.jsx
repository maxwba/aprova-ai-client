import React, { useEffect, useState } from "react";
import Axios from "axios";
import { withTheme } from "react-jsonschema-form";
import { Theme as MuiTheme } from "rjsf-material-ui";
import { Container } from "@material-ui/core";
import { Link } from "react-router-dom";

const RenderForm = props => {
  const { clientSection } = props
  const { currentClient } = props;
  const [forms, handleForm] = useState([]);
  const Form = withTheme(MuiTheme);

  console.log(clientSection)

  // Method for capturing inputs
  const handleSubmit = ({ formData }) => {
    // Task post
    Axios.post(
      process.env.REACT_APP_API_URL + "/task",
      // eslint-disable-next-line no-restricted-globals
      { properties: formData, clientId: clientSection, aproval: 'Aguardando aprovação' },
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
      // eslint-disable-next-line array-callback-return
      const newForm = responseFromApi.data.map(prop => {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div>
      <Link
          className="logo navbar-brand d-inline-block align-top ml-4 mt-3"
          exact
          to="/"
        >

          <img src="../images/logo.png" alt=""/> 
        </Link>

    <div className="renderForm">
    <Container>
    <h2 className="mt-2">{currentClient.name}</h2>
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
