import React from 'react';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import green from 'material-ui/colors/green';
import yellow from 'material-ui/colors/yellow';
import Button from 'material-ui/Button';
import CheckIcon from 'material-ui-icons/Check';
import Receipt from 'material-ui-icons/Receipt';
import cx from '../../utils/cx';

const styles = theme => ({
  wrapper: {
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonPending: {
    backgroundColor: yellow[500],
    '&:hover': {
      backgroundColor: yellow[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: 0,
    marginLeft: 0,
  },
});


export const Circurlar = withStyles(styles)(({ classes, loading, success, pending, error, children, onClick=(v=>v), ...props }) =>
  <div className={classes.wrapper}>
    <Button
      variant="fab"
      color="primary"
      className={cx({
        [classes.buttonSuccess]: success,
        [classes.buttonPending]: pending,
      })}
      onClick={onClick}
      {...props}>
      { pending ? <Receipt /> :
        success ? <CheckIcon /> :
        children
      }
    </Button>
    {loading && <CircularProgress size={'100%'} className={classes.fabProgress} />}
   </div>)


export const Rectangular = withStyles(styles)(({ classes, loading, success, error, children, onClick=(v=>v), ...props }) =>
<div className={classes.wrapper}>
  <Button
    variant="raised"
    color="primary"
    className={cx({
      [classes.buttonSuccess]: success,
    })}
    disabled={loading}
    onClick={onClick}
    {...props}>
    { children }
  </Button>
  {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
</div>)
