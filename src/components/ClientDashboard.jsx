import React from "react";
import { withTheme } from "react-jsonschema-form";
import { Theme as MuiTheme } from "rjsf-material-ui";
import NavClient from "./NavClient";
import { Link as LinkRouter } from "react-router-dom";
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
  const [forms, changeForm] = React.useState([]);
  const [tasks, changeTask] = React.useState([]);
  const [clientName, handleClientName] = React.useState(props.history.action);
  const [stateInfo, handleStateInfo] = React.useState(false);
  const [taskInfo, handleTaskInfo] = React.useState(false);

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

  if (!stateInfo) {
    const url = props.location.pathname.split("/")[3];
    Axios.get(process.env.REACT_APP_API_URL + "/infos/forms")
      .then(responseFromApi => {
        const newForm = responseFromApi.data.map(prop => {
          if (url === prop.clientId) {
            const { properties, _id } = prop;
            return {
              ...properties,
              _id
            };
          }
        });
        changeForm(newForm.filter(a => a !== undefined));
        handleStateInfo(true);
      })
      .catch(erro => console.log(erro));
  }

  if (!taskInfo) {
      const url = props.location.pathname.split("/")[3];
      Axios.get(process.env.REACT_APP_API_URL + "/infos/tasks")
        .then(responseFromApi => {
          console.log(responseFromApi)
          const task = responseFromApi.data.map(prop => {
            if (url === prop.clientId) {
              const { properties, _id, aproval } = prop;
              return {
                ...properties,
                _id,
                aproval
              };
            }
          });
          changeTask(task.filter(a => a !== undefined));
          handleTaskInfo(true)
        })
        .catch(erro => console.log(erro));
    };

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
              Olá, {clientName}
            </Typography>
            <br />
            <Typography variant="h5" component="h2">
              Formulários
            </Typography>
          </div>
          <br />
          {/* Random Forms*/}
          {forms.length > 0 ? (
            forms.map(({ _id }, idx) => {
              return (
                <div className="card flex-wrap col-md-3 mx-3 mb-3 d-inline-flex flex-row justify-content-around">
                  <div className="card-body ">
                    <h5 className="card-title"> Fomulário {idx + 1} </h5>
                    <LinkRouter className="link" to={`/renderform/${_id}`}>
                      {" "}
                      Detalhes{" "}
                    </LinkRouter>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="d-inline-flex ml-4 flex-column justify-content-around">
              <Typography variant="button" display="block" gutterBottom>
                Você não tem formulários disponíveis
              </Typography>
            </div>
          )}
          <br />
          <br />
          <div className="labels">
            <Typography variant="h5" component="h2">
              Jobs
            </Typography>
          </div>
          <br />
          {tasks.length > 0 ? (
            tasks.map(({ _id, aproval }, idx) => {
              return (
                <div>
                  <div className="card flex-wrap col-md-3 mx-3 d-inline-flex flex-row justify-content-around">
                    <div className="card-body ">
                      <h5 className="card-title">Tarefa {idx + 1} </h5>
                      <p className="card-text">
                        <b>Status: </b>
                        {aproval}
                      </p>
                      <LinkRouter className="link" to={`/JobDetail:${_id}`}>
                        {" "}
                        Detalhes{" "}
                      </LinkRouter>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="d-inline-flex ml-4 flex-column justify-content-around">
              <Typography variant="button" display="block" gutterBottom>
                Você não tem tarefas
              </Typography>
            </div>
          )}
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

// {forms.length > 0 &&
//   forms.map(form => {
//     const formSchema = {
//       // description: "User cria para empresa responder",
//       // type: "string",
//       properties: form
//     };
//     console.log(`=============>`, formSchema);
//     return <Form schema={formSchema} onSubmit={""} />;
//   })}
