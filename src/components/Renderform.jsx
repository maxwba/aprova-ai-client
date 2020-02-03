import React, { useEffect } from "react";
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
  useEffect(() => {
    Axios.get("http://localhost:5000/api/form").then(responseFromApi => {
      const newForm = responseFromApi.data.map(prop => {
        const { properties } = prop;
        return {
          ...properties
        };
      });
      handleForm(newForm);
    });
  }, []);

  // const novoform = forms.map(({ properties }, index) => {
  //   return properties;
  // });

  return (
    <Container>
      {forms.length > 0 &&
        forms.map(form => {
          const formSchema = {
            // title: "Oi monica",
            // description: "User cria para empresa responder",
            // type: "string",
            properties: form
          };
          console.log(`=============>`, formSchema);
          return <Form schema={formSchema} onSubmit={``} />;
        })}
    </Container>
  );
};

export default RenderForm;
