import React from "react";
import { withTheme } from "react-jsonschema-form";
import { Theme as MuiTheme } from "rjsf-material-ui";
import NavClient from "./NavClient";
import { Link } from "react-router-dom";
import Renderform from "./Renderform";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Login from "./loginclient";
import Axios from "axios";

const useStyles = makeStyles({
  root: {
    minWidth: 200
  },
  bullet: {
    display: "inline-block",
    margin: "2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export default function Dashboard(props) {
  const classes = useStyles();
  const [auth, changeAuth] = React.useState(false);
  const Form = withTheme(MuiTheme);

  const handleLogin = () => {
    const { password } = formSchema.properties;
    const url = props.location.pathname.split("/")[2];
    Axios.post(process.env.REACT_APP_API_URL + "/clientside/" + url, {
      clientId: url,
      password: password
    })
      .then(console.log("Logado"), changeAuth(true))
      .catch(error => console.log(error));
  };
  // props.location.pathname.split("/")[3]

  const formSchema = {
    title: "Digite a senha informada no seu e-mail",
    properties: {
      password: {
        type: "string",
        format: "password",
        title: "Senha"
      }
    }
  };

  return (
    <div>
      {auth ? (
        <div>
          <NavClient />
          <br />

          <div className="labels">
            <Typography variant="h3" component="h2">
              Olá, @nome
            </Typography>
            <br />
            <Typography variant="h5" component="h2">
              Formulários
            </Typography>
          </div>
          <br />
          <div className="cards d-flex col-md-3 ml-4">
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography variant="h6" component="h2">
                  NOME DO FORM
                </Typography>
                <br />
                <Typography variant="body1" component="p">
                  DESCRIÇÃO
                  <br />
                  {"....."}
                </Typography>
              </CardContent>
              <CardActions>
                <Link to="/renderform"> Detalhes </Link>
              </CardActions>
            </Card>
          </div>
          <br />
          <br />
          <div className="labels">
            <Typography variant="h5" component="h2">
              Jobs
            </Typography>
          </div>
          <br />
          <div className="cards d-flex col-md-4 ml-4">
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography variant="h6" component="h2">
                  NOME DO JOBB
                </Typography>
                <br />
                <Typography variant="body1" component="p">
                  status?? label??
                </Typography>
              </CardContent>
              <CardActions>
                <Link to="/renderform"> Detalhes (??) </Link>
              </CardActions>
            </Card>
          </div>
        </div>
      ) : (
        <div>
          <NavClient />
          <Form schema={formSchema} onSubmit={handleLogin} />
        </div>
      )}
    </div>
  );
}
