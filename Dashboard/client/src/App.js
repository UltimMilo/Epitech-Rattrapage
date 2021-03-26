import { Route, HashRouter, Redirect} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Navbar from './components/navigation/navbar';
import Login from './components/auth/login/login';
import Register from './components/auth/register/register';
import Dashboard from './components/pages/dashboard';
import withAuth from './withAuth';
import withoutAuth from './withoutAuth';
import { useState } from 'react';

const Theme = createMuiTheme({
  palette: {
    primary:{
      main: '#80ED99'
    },
  }
});

function App() {
  const [isAuth, setIsAuth] = useState(checkToken);

  function checkToken() {
    fetch('/checkToken')
      .then(res => {
        if (res.status === 200) {
          setIsAuth(true);
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        setIsAuth(false);
      });
  }

  return (
    <HashRouter>
      <MuiThemeProvider theme={Theme}>
        <div className="App">
          <div className='header'>
            <Navbar />
          </div>
          <div className='content'>
            <Redirect exact from="/" to="/dashboard" />
            <Route path='/auth/login' component={withoutAuth(Login)} />
            <Route path='/auth/register' component={withoutAuth(Register)} />
            <Route path='/dashboard' component={withAuth(Dashboard)} />
          </div>
        </div>
      </MuiThemeProvider>
    </HashRouter>
  );
}

export default App;
