import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  widget: {
    borderRadius: '10px',
  }
}))

function WidgetWrapper({component: Component, ...props}) {

  const classes = useStyles();

  return (
    <Paper className={classes.widget} elevation={3}>
      <Component {...props} />
    </Paper>
  );
}

export default WidgetWrapper;