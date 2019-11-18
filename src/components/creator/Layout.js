import React, { useState, useEffect, Fragment } from 'react';
import { Row, Column } from 'simple-flexbox';
import { FormControl } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import { Input } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import { StyleSheet, css } from 'aphrodite';
import PrompSlider from './PrompSlider';
import CircularProgress from '@material-ui/core/CircularProgress';
import AnswerModal from './AnswerModal';
import AnswersTable from './AnswersTable';

import { canSave, validateUrl } from './helper';

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

const Layout = props => {
  useEffect(() => {
    if (props.isLoading === false && props.finishSave === 'finished') {
      handleFinishSave();
    }
  }, [props.isLoading]);

  const [currentVideo, setCurrenVideo] = useState({
    videoUrl: '',
    title: '',
    question: '',
    answers: [],
    prompAt: null,
    promptValue: null,
  });
  const [ansewerList, setAnswerList] = useState([]);
  const [isOpenAddAnSwerModal, setIsOpenAddAnSwerModal] = useState(false);

  const handleChange = (value, prop) => {
    const currentVideoFromState = currentVideo;
    currentVideoFromState[prop] = value;
    setCurrenVideo({ ...currentVideoFromState, ...currentVideo });
  };

  const handleChangeAnswer = (value, prop, index) => {
    const answerListState = ansewerList;
    answerListState[index][prop] = value;
    setAnswerList([...answerListState]);
  };

  const handleCreateAnswer = answer => {
    const answerListState = ansewerList;
    answerListState.push(answer);
    setAnswerList([...answerListState]);

    setIsOpenAddAnSwerModal(false);
  };

  const handleDeleteAnswer = index => {
    const answerListState = ansewerList;
    answerListState.splice(index, 1);
    setAnswerList([...answerListState]);
  };

  const handleSaveVideo = () => {
    currentVideo.answers = ansewerList;
    props.saveAnswer(currentVideo);
  };

  const handleFinishSave = () => {
    setCurrenVideo({
      videoUrl: '',
      title: '',
      question: '',
      answers: [],
      prompAt: null,
      promptValue: null,
    });
    setAnswerList([]);
    window.location.reload();
  };

  return (
    <div className={'form-container'}>
      {!props.isLoading ? (
        <Fragment>
          <Row
            className={css(styles.container)}
            horizontal='start'
            vertical='center'
          >
            <Column className={css(styles.input)} flexGrow={1}>
              <FormControl fullWidth={true}>
                <InputLabel>{'Title*'}</InputLabel>
                <Input
                  value={currentVideo.title}
                  onChange={event => handleChange(event.target.value, 'title')}
                ></Input>
              </FormControl>
            </Column>
          </Row>
          <Row
            className={css(styles.container)}
            horizontal='start'
            vertical='center'
          >
            <Column className={css(styles.input)} flexGrow={1}>
              <FormControl fullWidth={true}>
                <InputLabel>{'Video Url*'}</InputLabel>
                <Input
                  value={currentVideo.videoUrl}
                  error={!validateUrl(currentVideo.videoUrl)}
                  onChange={event =>
                    handleChange(event.target.value, 'videoUrl')
                  }
                ></Input>
                <FormHelperText
                  hidden={validateUrl(currentVideo.videoUrl)}
                  className={css(styles.error)}
                >
                  {'Wrong video Url'}
                </FormHelperText>
              </FormControl>
            </Column>
          </Row>
          <Row
            className={css(styles.container)}
            horizontal='start'
            vertical='center'
          >
            <Column className={css(styles.input)} flexGrow={1}>
              <FormControl fullWidth={true}>
                <InputLabel>{'Question*'}</InputLabel>
                <Input
                  name={'questionInput'}
                  value={currentVideo.question}
                  onChange={event =>
                    handleChange(event.target.value, 'question')
                  }
                ></Input>
              </FormControl>
            </Column>
          </Row>
          <Row
            className={css(styles.container)}
            horizontal='start'
            vertical='center'
          >
            <PrompSlider onChange={value => handleChange(value, 'prompAt')} />
          </Row>
          <Row
            className={css(styles.container)}
            horizontal='start'
            vertical='center'
          >
            <Column className={css(styles.input)} flexGrow={1}>
              <InputLabel className={css(styles.answerLabel)}>
                {'Answers*'}
              </InputLabel>
              <div className={css(styles.answerContiner)}>
                <div className='answer-list'>
                  <AnswersTable
                    answers={ansewerList}
                    handleDeteleAnswer={index => handleDeleteAnswer(index)}
                  />
                </div>
                <div className='button-answer-container'>
                  <Fab
                    color='primary'
                    aria-label='add'
                    onClick={() => setIsOpenAddAnSwerModal(true)}
                    disabled={ansewerList.length > 5}
                  >
                    <AddIcon />
                  </Fab>
                </div>
              </div>
            </Column>
          </Row>
          <div className='button-save-container'>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => handleSaveVideo()}
              disabled={!canSave(currentVideo, ansewerList)}
            >
              save
            </Button>
          </div>
          <AnswerModal
            open={isOpenAddAnSwerModal}
            saveAnswer={answer => handleCreateAnswer(answer)}
          />
        </Fragment>
      ) : (
        <CircularProgress className='loader' />
      )}
    </div>
  );
};

export default Layout;
