import React from "react";
import Axios from "axios";
import { withTheme } from "react-jsonschema-form";
import { Theme as MuiTheme } from "rjsf-material-ui";
import { Container, Typography, Box, Button } from "@material-ui/core";

const RenderForm = () => {
  const [forms, handleForm] = React.useState();
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
      console.log(`=============>`, responseFromApi);
      handleForm(responseFromApi.data);
    });
  };

  const novoform = forms.map(({ properties }, index) => {
    return properties;
  });

  const formSchema = {
    title: "Formulario criado pelo user",
    description: "User cria para empresa responder",
    type: "string",
    properties: novoform
  };

  getAllForm();
  // Preciso fazer um map no forms pois está vindo tudo junto e misturado então precisamos renderizar um por um
  return (
    <Container>
      <Form schema={formSchema} onSubmit={``} />
      <div className="vini">
        <form onSubmit={``}>
          <label>Formulario de exemplo</label>
          {forms &&
            forms.map(({ title, description, type }, index) => {
              return (
                <Box key={index}>
                  <label>{title}</label>
                  <br />
                  <input type={type} name={title} value={description} />
                  <br />
                  <br />
                </Box>
              );
            })}
          <input type="submit" value="Submit" />
        </form>
      </div>
    </Container>
  );
};

export default RenderForm;
