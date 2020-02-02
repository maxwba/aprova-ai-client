import React from "react";
import Axios from "axios";
import { withTheme } from "react-jsonschema-form";
import { Theme as MuiTheme } from "rjsf-material-ui";
import { Container, Typography, Box, Button } from "@material-ui/core";

const RenderForm = () => {
  const [forms, handleForm] = React.useState([]);
  const Form = withTheme(MuiTheme);

  const convertArrayToObject = array => {
    const initialValue = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        ...item
      };
    }, initialValue);
  };

  const getAllForm = () => {
    Axios.get("http://localhost:5000/api/form").then(responseFromApi => {
      console.log(responseFromApi);
      handleForm(responseFromApi.data);
    });
  };

  const formSchema = {
    title: "Formulario criado pelo user",
    description: "User cria para empresa responder",
    type: "string",
    properties: convertArrayToObject(forms)
  };

  console.log(`=========>`, forms);

  // Preciso fazer um map no forms pois está vindo tudo junto e misturado então precisamos renderizar um por um
  return (
    <Container>
      <Form schema={formSchema} onSubmit={console.log("foi")} />
    </Container>
  );
};

export default RenderForm;
