import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

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

const FinalizationModal = props => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  return (
    <div>
      <Modal
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        open={props.open}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id='simple-modal-title'>
            {props.succeed ? 'Congratulations' : 'Good look for next time'}
          </h2>
          <div className='emoji-container'>
            {props.succeed ? (
              <EmojiEmotionsIcon className='success' />
            ) : (
              <SentimentVeryDissatisfiedIcon className='failure' />
            )}
          </div>
          <div className='button-save-container'>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => props.handleCloseFinishModal()}
            >
              Start Over
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FinalizationModal;
