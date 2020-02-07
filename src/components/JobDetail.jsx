import React from "react";
import NavClient from "./NavClient";
import Axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

const JobDetail = props => {
  const classes = useStyles();
  const [loopControl, handleLoop] = React.useState(false);
  const [tasks, changeTask] = React.useState([]);

  if (!loopControl) {
    const url = props.location.pathname.split("/")[2];
    Axios.get(process.env.REACT_APP_API_URL + "/task")
      .then(responseFromApi => {
        const task = responseFromApi.data.map(prop => {
          if (url === prop._id) {
            const { properties, aproval, _id } = prop;
            return {
              properties,
              aproval,
              _id
            };
          }
        });
        changeTask(task.filter(a => a !== undefined));
        handleLoop(true);
      })
      .catch(erro => console.log(erro));
  }

  // console.log(tasks.map(a => a._id))
  const taskId = tasks.map(a => a._id);
  console.log(taskId);

  function setAproval(taskId) {
    Axios.post(process.env.REACT_APP_API_URL + `/task/${taskId}`, {
      aproval: "Aprovado",
      withCredentials: true
    })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function setDenied(taskId) {
    Axios.post(process.env.REACT_APP_API_URL + `/task/${taskId}`, {
      aproval: "Recusado",
      withCredentials: true
    })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div>
      <NavClient />
      <TextField
        id="standard-full-width"
        label="Titulo"
        style={{ margin: 8 }}
        placeholder={tasks.map(a => a.properties.propa)}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true
        }}
      />
      <TextField
        id="standard-full-width"
        label="Descrição"
        style={{ margin: 8 }}
        placeholder={tasks.map(a => a.properties.propb)}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true
        }}
      />
      <TextField
        id="standard-full-width"
        label="Data de entrega"
        style={{ margin: 8 }}
        placeholder={tasks.map(a => a.properties.propc)}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true
        }}
      />
      <TextField
        id="standard-full-width"
        label="Valor"
        style={{ margin: 8 }}
        placeholder={tasks.map(a => a.properties.propd)}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true
        }}
      />
      <TextField
        id="standard-full-width"
        label="Status"
        style={{ margin: 8 }}
        placeholder={tasks.map(a => a.aproval)}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true
        }}
      />
      <Button
        variant="outlined"
        size="large"
        color="primary"
        className={classes.margin}
        onClick={() => setAproval(taskId)}
      >
        Aprovar briefing
      </Button>
      <Button
        variant="outlined"
        size="large"
        color="secondary"
        className={classes.margin}
        onClick={() => setDenied(taskId)}
      >
        Declinar
      </Button>
    </div>
  );
};

export default JobDetail;
