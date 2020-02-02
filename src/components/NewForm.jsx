import React, { useState } from "react";
import { withTheme } from "react-jsonschema-form";
import { Theme as MuiTheme } from "rjsf-material-ui";
import { Container, Typography, Box, Button } from "@material-ui/core";
import Axios from "axios";

export default function Test() {
  const [inputs, setInputs] = useState([]);
  const Form = withTheme(MuiTheme);

  const schema = {
    properties: {
      title: {
        type: "string",
        title: "Escreva um nome para esse campo"
      },
      description: {
        type: "string",
        title: "Escreva o nome do campo para o Cliente"
      },
      type: {
        type: "string", //Enum, de valores definidos, string, date, email, password, bla
        enum: ["string", "data", "number"]
      }
    }
  };

  const handleSubmit = ({ formData }) => {
    setInputs(inputs => [...inputs, { ...formData }]);
  };

  const handleFormSave = () => {
    const data = inputs.map(({ title, description, type }) => {
      const key = title.toLowerCase().replace(/\s/g, "");

      return {
        [key]: {
          type,
          description: description
        }
      };
    });

    const convertArrayToObject = array => {
      const initialValue = {};
      return array.reduce((obj, item) => {
        return {
          ...obj,
          ...item
        };
      }, initialValue);
    };

    const formSchema = {
      title: "Formulario criado pelo user",
      description: "User cria para empresa responder",
      type: "string",
      properties: convertArrayToObject(data)
    };

    const handleFormSubmit = () => {
      const { properties } = formSchema;

      Axios.post(
        "http://localhost:5000/api/form",
        { properties: properties },
        { withCredentials: true }
      )
        .then(data => {
          console.log(data);
          setInputs([]);
        })
        .catch(error => console.log(error));
    };

    handleFormSubmit();

    //1. salvar na api
    //2. criar um endpoint que recupera este json
    //3. coloca esse json num novo form <Form schema={resposta da api}
    //4. ao dar submit nesse novo form, vc ta criando um ticket.
  };

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit} />

      {inputs &&
        inputs.map(({ title, description, type }, index) => {
          return (
            <Box key={index} p={2}>
              <Typography>Título:{title}</Typography>
              <Typography>Descrição:{description}</Typography>
              <Typography>Tipo:{type}</Typography>
            </Box>
          );
        })}

      <Button variant="contained" color="primary" onClick={handleFormSave}>
        Salvar Formulário
      </Button>
    </Container>
  );
}
