import React, { useState } from "react";
import AuthService from "./auth-service";

//Material design UI
import { Button, TextField, Link, Grid, Box, Typography, Container, makeStyles } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
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

  const handleFormSubmit = (email, password) => {
    service.signup(email, password)
    .then(user => {
      handleEmail('');
      handlePassword('');
      props.getUser(user);
      props.history.push('/dashboard');
    })
    .catch(error => {
      handleMessage(error.response.data.message)
      console.log(error);
    })
  };

  const classes = useStyles();
  return (
    <Container className="form" component="main" maxWidth="xs">
      <div className={classes.paper}>
        <img src='./images/locked.png' alt='' />
        <Typography component="h1" variant="h5">
          Signup
        </Typography>
        <form className={classes.form}>
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
            onChange={event => {
              handleEmail(event.target.value)
            }}
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
            onChange={event => {
              handlePassword(event.target.value)
            }}
          />
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => handleFormSubmit(email,password)}
          >
            Signup
          </Button>
          {/*         
          <button
          className="google">
          <img src="/images/Google.png" alt="" style={{width: 21, marginRight:8, marginLeft: -4}} />
              <Link className="login" href={process.env.REACT_APP_API_URL + '/auth/google'} variant="body2">
                {"SIGN UP COM O GOOGLE"}
              </Link>

          </button>
          <br /> */}
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
              <Box />
            )}
        </form>
      </div>
    </Container>
  );
};
export default Signup;
