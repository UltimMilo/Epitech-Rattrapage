import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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

function Navbar() {
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

export default Navbar;