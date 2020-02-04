import React, { useState } from "react";
import { Link } from "react-router-dom";
import Renderform from "./Renderform";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import NewForm from "./NewForm";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

export default function ClienteDetails(props) {
  const { selectedClient } = props;
  const classes = useStyles();
  const [newform, handleform] = useState(false);

  const formCreate = () => {
    handleform(true);
  };

  console.log(selectedClient);

  return (
    <div>
      <Button variant="contained" color="primary" onClick={formCreate}>
        Crie um novo formulário
      </Button>

      {newform ? (
        <NewForm />
      ) : (
        <div>
          <br />
          <h1> {selectedClient.name} </h1>
          <br />
          <Link to={selectedClient.shareLink}>LINK PARA CLIENTE</Link>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      )}
    </div>
  );
}
