import React, { useEffect } from "react";
import axios from "axios";
import Link from "@material-ui/core/Link";
import { Link as LinkRouter } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormDetail from "./Renderform";
import NewForm from "./NewForm";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { green } from "@material-ui/core/colors";
import Icon from "@material-ui/core/Icon";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    "& > span": {
      margin: theme.spacing(2)
    },
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },

  large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  }
}));

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

export default function ClienteDetails(props) {
  let { selectedClient, resetState } = props;
  const classes = useStyles();
  const [form, setForm] = React.useState(false);
  const [clientForm, handleClientForm] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [id, handleId] = React.useState(null);

  const handleDrawerOpen = () => {
    setForm(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function deleteProject() {
    axios
      .delete(`http://localhost:5000/api/client/${selectedClient._id}`, {
        withCredentials: true
      })
      .then(() => {
        props.handleDeleteClient();
      })
      .catch(err => {
        console.log(err);
      });
  }

  if (id !== selectedClient._id) {
    handleId(selectedClient._id);
    axios.get("http://localhost:5000/api/form").then(responseFromApi => {
      const forms = responseFromApi.data.filter(checkClient => {
        if (checkClient.clientId === selectedClient._id) {
          return checkClient;
        }
      });
      console.log(forms);
      handleClientForm(forms);
    });
  }

  return (
    <div>
      {form ? (
        <NewForm selectedClient={selectedClient} />
      ) : (
        <div>
          <div className="labels">
            <Typography variant="h4" component="h2">
              {selectedClient.name}
            </Typography>
            <Typography className={classes.root}>
              <Link href="#" variant="body2">
                {selectedClient.shareLink}
              </Link>
            </Typography>
            <br />
            <br />
            <Typography variant="h5" component="h2">
              Formulários
            </Typography>
          </div>

          <br />

          {clientForm.length > 0 ? (
            clientForm.map(({ _id }, idx) => {
              return (
                <div className="cards d-flex col-md-3 ml-4">
                  <Card className={classes.root} variant="outlined">
                    <CardContent>
                      <Typography variant="h6" component="h2">
                        {_id}
                      </Typography>
                      <br />
                      <Typography variant="body1" component="p">
                        {_id}
                        <br />
                      </Typography>
                      <br />
                      <LinkRouter to="/renderform"> Detalhes </LinkRouter>
                    </CardContent>
                  </Card>
                </div>
              );
            })
          ) : (
            <h1>Nenhum formulario</h1>
          )}

          <Button color="primary" onClick={handleDrawerOpen}>
            Criar formulário
          </Button>
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
                <br />
                <LinkRouter to="/renderform"> Detalhes </LinkRouter>
              </CardContent>
            </Card>
          </div>

          <br />
          <br />
          <Button
            className="btnDelete"
            variant="outlined"
            onClick={handleClickOpen}
          >
            Deletar cliente
          </Button>
          <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              Deletar cliente
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
                Tem certeza que deseja deletar cliente?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={deleteProject} color="primary">
                Deletar
              </Button>
            </DialogActions>
          </Dialog>

          <div className={classes.root}></div>

          <Icon style={{ color: green[400], fontSize: 60 }}>add_circle</Icon>
        </div>
      )}
    </div>
  );
}
