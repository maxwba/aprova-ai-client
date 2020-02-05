import React, { useState } from "react";
import { withTheme } from "react-jsonschema-form";
import { Theme as MuiTheme } from "rjsf-material-ui";

const Formularioteste = () => {
  const [form, handleForm] = useState([]);
  const Form = withTheme(MuiTheme);

  const schema = {
    title: "Crie um titulo",
    type: "object",
    properties: {
      prop: {
        type: "string",
        title: "Defina um titulo para seu forms"
      }
    }
  };

  const onSubmit = ({ formData }) => console.log("Data submitted: ", formData);
  let yourForm;

  return (
    <div>
      <Form
        schema={schema}
        onSubmit={onSubmit}
        ref={form => {
          yourForm = form;
        }}
      />
    </div>
  );
};

export default Formularioteste;
