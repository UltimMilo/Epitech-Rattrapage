import { useState } from 'react';
import { Avatar, Button, CssBaseline, makeStyles, TextField, Grid, Typography, Container, Paper } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router";

import LoginGithub from 'react-login-github';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#80ED99',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  github: {
    backgroundColor: '#000000',
    color: theme.palette.secondary.main,
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
    fontWeight: 'bold',
    width: '100%',
    borderRadius: '4px',
    border: 'none',
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
    cursor: 'pointer'
  }
}));

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const classes = useStyles();

  const history = useHistory();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  function onSubmit(event) {
    const body = {'email': email, 'password': password};

    event.preventDefault();
    fetch('/api/authenticate', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
        history.push({
          'pathname': "/dashboard",
          'state': {
            'response': res
          }
        })
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={handleEmail}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={handlePassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <NavLink to="register">
                {"Don't have an account? Sign Up"}
              </NavLink>
            </Grid>
          </Grid>
        </form>
        <LoginGithub
          clientId={process.env.REACT_APP_GITHUB_CLIENT_ID}
          redirectUri={process.env.REACT_APP_GITHUB_REDIRECT_URI}
          scope='user'
          onSuccess={(res) => {
            const body = { 'code': res.code };

            fetch('/api/github', {
              method: 'POST',
              body: JSON.stringify(body),
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .then(response => response.json())
            .then(data => {
              if (data.access_token !== 'undefined') {
                window.sessionStorage.setItem('github-token', data.access_token);
                history.push('/dashboard');
              } else {
                alert('Unable to login with github account');
              }
            })
            .catch(error => {
              console.log(error);
            })
          }}
          onFailure={(event) => {
            console.log('Github auth failure');
            console.log(event);
          }}
          buttonText='Login with github'
          className={classes.github}
        />
      </Paper>
    </Container>
  );
}