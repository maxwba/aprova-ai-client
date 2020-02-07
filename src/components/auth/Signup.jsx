import React, { useState } from "react";
import AuthService from "./auth-service";

//Material design UI
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Aprova.AI
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Signup = props => {
  const [email, handleEmail] = useState("");
  const [password, handlePassword] = useState("");
  const [message, handleMessage] = useState("");
  const service = new AuthService();

  const handleFormSubmit = event => {
    event.preventDefault();
    service
      .signup(email, password)
      .then(user => {
        handleEmail("");
        handlePassword("");
        props.getUser(user);
        props.history.push("/dashboard");
      })
      .catch(error => {
        handleMessage(error.response.data.message);
      });
  };

  const classes = useStyles();
  return (
    <Container className="form" component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Signup
        </Typography>
        <form className={classes.form} onSubmit={handleFormSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            require="true"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={e => handleEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={e => handlePassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Lembrar"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Signup
          </Button>
        
          <button
          className="google">
          <img src="/images/Google.png" alt="" style={{width: 21, marginRight:8, marginLeft: -4}} />
              <Link className="login" href={process.env.REACT_APP_API_URL + '/auth/google'} variant="body2">
                {"SIGN UP COM O GOOGLE"}
              </Link>

          </button>
          <br />
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Já tem uma conta? Login"}
              </Link>
            </Grid>
          </Grid>

          {message ? (
            <Alert variant="outlined" severity="error">
              {message}
            </Alert>
          ) : (
            <h1></h1>
          )}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};
export default Signup;
