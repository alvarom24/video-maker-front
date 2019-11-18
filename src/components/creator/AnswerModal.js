import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Checkbox from '@material-ui/core/Checkbox';
import { Row, Column } from 'simple-flexbox';
import { FormControl } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import { Input } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import { StyleSheet, css } from 'aphrodite';
import { validateUrl } from './helper';

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
    width: 700,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const styles = StyleSheet.create({
  container: {
    marginLeft: 32,
    marginRight: 32,
  },
  imput: {
    marginRight: '10px',
  },
  answerContiner: {
    width: '100%',
    height: ' 300px',
    border: '1px solid #8e8e91',
    marginTop: '15px',
    position: 'relative',
  },
  answerLabel: {
    marginTop: '15px',
  },
  error: {
    color: '#f44336',
  },
});

const AnswerModal = props => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [currentAnswer, setCurrentAnswer] = useState({
    description: '',
    urlAfterAnser: '',
    isCorrect: false,
  });

  const handleChangeAnswer = (value, prop) => {
    const edited = currentAnswer;
    edited[prop] = value;
    setCurrentAnswer({ ...edited, currentAnswer });
  };

  const canAddAnswer = () => {
    return currentAnswer.description !== '' && validateRedirection();
  };

  const validateRedirection = () => {
    if (currentAnswer.urlAfterAnser !== '') {
      return validateUrl(currentAnswer.urlAfterAnser);
    }
    return true;
  };

  const handleSaveAnswer = () => {
    props.saveAnswer(currentAnswer);
    setCurrentAnswer({
      description: '',
      urlAfterAnser: '',
      isCorrect: false,
    });
  };

  return (
    <div>
      <Modal
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        open={props.open}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id='simple-modal-title'>{'Add Answer'}</h2>
          <div className={'answer-item'}>
            <div className={'answer-description'}>
              <Row>
                <FormControl fullWidth={true}>
                  <InputLabel>{'Answer'}</InputLabel>
                  <Input
                    value={currentAnswer.description}
                    onChange={event =>
                      handleChangeAnswer(event.target.value, 'description')
                    }
                  ></Input>
                </FormControl>
              </Row>
            </div>
            <div className={'answer-description'}>
              <Row>
                <FormControl fullWidth={true}>
                  <InputLabel>{'Redirects to after answer'}</InputLabel>
                  <Input
                    value={currentAnswer.urlAfterAnser}
                    error={!validateUrl(currentAnswer.urlAfterAnser)}
                    onChange={event =>
                      handleChangeAnswer(event.target.value, 'urlAfterAnser')
                    }
                  ></Input>
                  <FormHelperText
                    hidden={validateUrl(currentAnswer.urlAfterAnser)}
                    className={css(styles.error)}
                  >
                    {'Wrong  Url'}
                  </FormHelperText>
                </FormControl>
              </Row>
            </div>
            <div className={'answer-correct'}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={currentAnswer.isCorrect}
                      onChange={event =>
                        handleChangeAnswer(event.target.checked, 'isCorrect')
                      }
                    />
                  }
                  label='isCorrect'
                />
              </FormGroup>
            </div>
          </div>
          <div className='button-save-container'>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => handleSaveAnswer()}
              disabled={!canAddAnswer()}
            >
              Add
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AnswerModal;
