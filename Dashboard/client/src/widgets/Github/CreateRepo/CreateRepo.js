import { useState } from 'react';
import { TextField, Button, makeStyles, Checkbox, FormControlLabel } from '@material-ui/core';

import LoginGithub from 'react-login-github';

const useStyles = makeStyles(theme => ({
  form: {
  },
  description: {
    marginTop: theme.spacing(1),
  },
  submit: {
    fontWeight: 'bold',
    color: theme.palette.secondary.main,
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
}))

function CreateRepo({parameters, ...props}) {

  const [repository, setRepository] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(false);

  const [githubToken, setGithubToken] = useState(window.sessionStorage.getItem('github-token'));

  const classes = useStyles();

  return (
    <div>
      {githubToken ? (
        <form className={classes.form}>
          <TextField
            label='Repository name'
            type='text'
            variant='outlined'
            value={repository}
            onChange={(e) => setRepository(e.target.value)}
            fullWidth
          />
          <TextField
            label='Description'
            type='text'
            variant='outlined'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={classes.description}
            fullWidth
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={status}
                color='primary'
                onChange={(e) => setStatus(e.target.checked)}
              />
            }
            label='Set as private repository'
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.submit}
            fullWidth
          >
            Create repository
          </Button>
        </form>
      ) : (
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
                setGithubToken(data.access_token);
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
      )}
    </div>
  )
}

export default CreateRepo;