import React, { useState } from "react";
import { withTheme } from "react-jsonschema-form";
import { Theme as MuiTheme } from "rjsf-material-ui";
import { Container, Typography, Box, Button } from "@material-ui/core";
import Axios from "axios";
import { Link } from "react-router-dom"
import ClientDetail from "./ClientDetails";
import { type } from "os";

export default function NewForm(props) {
  const [inputs, setInputs] = useState([]);
  const Form = withTheme(MuiTheme);
  const { selectedClient } = props;
  const [cDetail, handleClientDetail] = useState(false);


  const schema = {
    title: "Crie seu formulário",
    /*  description: "A simple form example.", */
    type: "object",
    required: ["type"],
    properties: {
      prop: {
        type: "string",
        title: "Nome da propriedade"
      },
      description: {
        type: "string",
        title: "Descrição"
      },
      type: {
        type: "string", //Enum, de valores definidos, string, date, email, password, bla
        enum: ["string", "date", "number", "files"]
      }
    }
  };

  const handleSubmit = ({ formData }) => {
    setInputs(inputs => [...inputs, { ...formData }]);
  };

  const turnClientDetail = () => {
    handleClientDetail(true);
  };

  const handleFormSave = () => {
    const data = inputs.map(({ prop, description, type }) => {
      const key = prop.toLowerCase().replace(/\s/g, "");
      if (type === "date") {
        return {
          [key]: {
            type: "string",
            format: "date",
            description: description
          }
        };
      } else if (type === "files") {
        return {
          [key]: {
            type: "string",
            format: "data-url",
            title: prop,
            description: description
          }
        };
      } else {
        return {
          [key]: {
            type,
            description: description
          }
        };
      }
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
      const { _id } = selectedClient;

      Axios.post(
        process.env.REACT_APP_API_URL + "/form",
        { properties, clientId: _id },
        { withCredentials: true }
      )
        .then(data => {
          setInputs([]);
          props.handleDrawerClose()
        })
        .catch(error => console.log(error));
    };

    handleFormSubmit();
    turnClientDetail();

    //1. salvar na api
    //2. criar um endpoint que recupera este json
    //3. coloca esse json num novo form <Form schema={resposta da api}
    //4. ao dar submit nesse novo form, vc ta criando um ticket.
  };

  return (
    <>
         <div className="name">
          
            <h2 className="mt-2">{selectedClient.name}</h2>
            
            </div>
            <br />
       
      <Container className="newForm">
        <Form schema={schema} onSubmit={handleSubmit} />
        {inputs &&
          inputs.map(({ title, description, type }, index) => {
            return (
              <Box key={index} p={2}>
                <form action="/action_page.php">
                  {description}:<br />
                  <div class="form-group createForm">
              <input type={type} name={title}  class="form-control createForm" id="exampleInputEmail1" />
                    </div>

                </form>
              </Box>
            );
          })}
        <br />
     
        <Button style={{backgroundColor: "#2F6F84" }} variant="contained" color="primary" onClick={handleFormSave}>
          Salvar Formulário
        </Button>

      </Container>

    </>
  );
}
