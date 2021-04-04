import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#80ED99',
  },
  title: {
    color: 'white',
  },
  link: {
    color: 'white',
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <AppBar position='static' className={classes.root}>
      <Toolbar variant='dense'>
        <Box display='flex' flexGrow={1}>
          <NavLink to='/' style={{textDecoration: 'none'}}>
            <Typography variant='h6' className={classes.title}>Dashboard</Typography>
          </NavLink>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;