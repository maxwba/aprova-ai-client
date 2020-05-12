import React from "react";
import { withTheme } from "react-jsonschema-form";
import { Theme as MuiTheme } from "rjsf-material-ui";
import NavClient from "./NavClient";
import { Link as LinkRouter } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Axios from "axios";


export default function Dashboard(props) {
  const [auth, changeAuth] = React.useState(false);
  const Form = withTheme(MuiTheme);
  const [forms, changeForm] = React.useState([]);
  const [tasks, changeTask] = React.useState([]);
  const [stateInfo, handleStateInfo] = React.useState(false);
  const [taskInfo, handleTaskInfo] = React.useState(false);
  const max = props.location.pathname.split("/")[3];

  

  const handleLogin = (props) => {
    const { password } = formSchema.properties;
    const url = max;
    console.log(typeof password)
    Axios.post(process.env.REACT_APP_API_URL + "/clientside/" + url, {
      clientId: url,
      password: password.title
    })
      .then(console.log("Logado"), changeAuth(true))
      .catch(error => console.log(error));
  };

  if (!stateInfo) {
    const url = props.location.pathname.split("/")[3];
    Axios.get(process.env.REACT_APP_API_URL + "/infos/forms")
      .then(responseFromApi => {
        // eslint-disable-next-line array-callback-return
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
        props.getClientSection(max)
      })
      .catch(erro => console.log(erro));
  }

  if (!taskInfo) {
      const url = props.location.pathname.split("/")[3];
      Axios.get(process.env.REACT_APP_API_URL + "/infos/tasks")
        .then(responseFromApi => {
          // eslint-disable-next-line array-callback-return
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

          <div className="name d-flex">
           <h2 className="mt-2">Bem vindo,</h2>
          </div>
    
          <br />
          <div className="labels">
            <h3>Formulários</h3>
          
          </div>

        
          <br />
          {/* Random Forms*/}
          {forms.length > 0 ? (
            forms.map(({ _id }, idx) => {
              return (
                <div className="card flex-wrap col-md-3 col-sm-12 mx-md-3 mb-3 d-inline-flex flex-row justify-content-around">
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
            <h3>Jobs</h3>
          
          </div>
          
          <br />
          {tasks.length > 0 ? (
            tasks.map(({ _id, aproval }, idx) => {
              return (
                <div className="card flex-wrap col-md-3 col-sm-12 mx-md-3 mb-3 d-inline-flex flex-row justify-content-around">
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
