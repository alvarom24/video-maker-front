import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import { InputLabel } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { StyleSheet, css } from 'aphrodite';
import { Input } from '@material-ui/core';

function getModalStyle() {
  const top = 57;
  const left = 58;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const styles = StyleSheet.create({
  error: {
    color: '#f44336',
  },
});

const EmailModal = props => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [currentEmail, setCurrentEmail] = useState('');

  const validateEmail = email => {
    if (email === '') {
      return true;
    }
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const canProceed = () => {
    return currentEmail && validateEmail(currentEmail);
  };

  return (
    <div>
      <Modal
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        open={props.open}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id='simple-modal-title'>{'Provide us with an email'}</h2>
          <div className='modal-answer-container'>
            <div className='answer-check'>
              <FormControl fullWidth={true}>
                <InputLabel>{'Email'}</InputLabel>
                <Input
                  value={currentEmail}
                  error={!validateEmail(currentEmail)}
                  onChange={event => setCurrentEmail(event.target.value)}
                ></Input>
                <FormHelperText
                  hidden={validateEmail(currentEmail)}
                  className={css(styles.error)}
                >
                  {'Invalid email format'}
                </FormHelperText>
              </FormControl>
            </div>
          </div>

          <div className='button-save-container'>
            <Button
              variant='contained'
              color='primary'
              onClick={() => props.onCloseEmailModal()}
              disabled={false}
            >
              Cancel
            </Button>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => props.onProceed(currentEmail)}
              disabled={!canProceed()}
            >
              Proceed
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EmailModal;
