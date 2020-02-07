import React, { useEffect, useState } from "react";
import Axios from "axios";
import { withTheme } from "react-jsonschema-form";
import { Theme as MuiTheme } from "rjsf-material-ui";
import { Container, Typography, Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";

const RenderForm = props => {
  const { currentClient } = props;
  const [forms, handleForm] = useState([]);
  const [inputs, setInputs] = useState([]);
  const Form = withTheme(MuiTheme);

  // Method for capturing inputs
  const handleSubmit = ({ formData }) => {
    // Task post
    Axios.post(
      process.env.REACT_APP_API_URL + "/task",
      // eslint-disable-next-line no-restricted-globals
      {
        properties: {
          formData
        },
        clientId: props.currentClient._id,
        aproval: "Aguardando aprovação"
      },
      { withCredentials: true }
    )
      .then(data => {
        console.log(data);
      })
      .catch(error => console.log(error));
  };

  console.log("forms ->", forms);
  //Get Form detail
  useEffect(() => {
    Axios.get(process.env.REACT_APP_API_URL + "/form").then(responseFromApi => {
      const newForm = responseFromApi.data.map(prop => {
        if (
          currentClient._id === prop.clientId &&
          prop._id === props.location.pathname.split("/")[2]
        ) {
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
        <img src="../images/logo.png" alt="" />
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
          <button class="btnBack" onClick={props.history.goBack}>
            Voltar
          </button>
        </Container>
      </div>
    </div>
  );
};

export default RenderForm;
