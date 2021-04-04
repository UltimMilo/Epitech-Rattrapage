import { useState, useEffect } from 'react';
import { Button, makeStyles } from '@material-ui/core';

import LoginGithub from 'react-login-github';

import axios from 'axios';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PersonIcon from '@material-ui/icons/Person';
import FolderIcon from '@material-ui/icons/Folder';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';

const useStyles = makeStyles(theme => ({
  avatar: {
    width: '50%',
    borderRadius: '15px'
  },
  account: {
    display: 'flex',
    width: '100%'
  },
  infos: {
    width: '50%',
    padding: theme.spacing(2),
  },
  box: {
    display: 'flex',
    marginBottom: theme.spacing(1)
  },
  text: {
    marginLeft: theme.spacing(1),
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

function Account({parameters, ...props}) {

  const [account, setAccount] = useState(null);
  const [githubToken, setGithubToken] = useState(window.sessionStorage.getItem('github-token'));

  const classes = useStyles();

  useEffect(() => {
    if(!githubToken) return;

    axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${githubToken}`,
      }
    }).then(response => {
      setAccount(response.data);
    }).catch(error => {
      console.log(error);
    })
  }, [githubToken])

  return (
      <div>
        {account ? (
          <div className={classes.account}>
            <img className={classes.avatar} src={account.avatar_url} alt='avatar'/>
            <div className={classes.infos}>
              <div className={classes.box}>
                <AccountCircleIcon color='primary' />
                <div className={classes.text}>{account.login}</div>
              </div>
              <div className={classes.box}>
                <PersonIcon color='primary' />
                <div className={classes.text}>{account.name}</div>
              </div>
              <div className={classes.box}>
                <LocationOnIcon color='primary' />
                <div className={classes.text}>{account.location}</div>
              </div>
              <div className={classes.box}>
                <FolderIcon color='primary' />
                <div className={classes.text}>{account.public_repos + account.total_private_repos}</div>
              </div>
              <Button variant='contained' color='primary' fullWidth onClick={() => window.open(account.html_url)}>
                <OpenInBrowserIcon color='secondary' />
              </Button>
            </div>
          </div>
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
  );
}

export default Account;