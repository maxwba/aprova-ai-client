import React, { useEffect, useState } from "react";
import Axios from "axios";
import { withTheme } from "react-jsonschema-form";
import { Theme as MuiTheme } from "rjsf-material-ui";
import { Container, Typography, Box, Button } from "@material-ui/core";

const RenderForm = props => {
  const { currentClient } = props;
  const [forms, handleForm] = useState([]);
  const [inputs, setInputs] = useState([]);
  const Form = withTheme(MuiTheme);

  // Method for capturing inputs
  const handleSubmit = ({ formData }) => {
    setInputs([{ ...formData }]);
    // Task post
    Axios.post(
      process.env.REACT_APP_API_URL + "/task",
      // eslint-disable-next-line no-restricted-globals
      { properties: inputs, clientId: props.currentClient._id, aproval: 'Aguardando aprovação' },
      { withCredentials: true }
    )
      .then(data => {
        console.log(data);
      })
      .catch(error => console.log(error));
  };

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
    <Container>
      <Typography>{currentClient.name}</Typography>
      {forms.length > 0 &&
        forms.map(form => {
          const formSchema = {
            // description: "User cria para empresa responder",
            // type: "string",
            properties: form
          };
          console.log(`=============>`, formSchema);
          return <Form schema={formSchema} onSubmit={handleSubmit} />;
        })}
    </Container>
  );
};

export default RenderForm;
