import React, { useState } from 'react';
import { Row, Column } from 'simple-flexbox';
import { FormControl } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import { Input } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import { StyleSheet, css } from 'aphrodite';

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
    border: '1px solid',
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
  const [currentVideo, setCurrenVideo] = useState({
    videoUrl: '',
    title: '',
    question: '',
    answers: [],
    prompAt: null,
    promptValue: null,
  });
  const [ansewerList, setAnswerList] = useState([]);

  const handleChange = (value, prop) => {
    const currentVideoFromState = currentVideo;
    currentVideoFromState[prop] = value;
    setCurrenVideo({ ...currentVideoFromState, ...currentVideo });
  };

  const handleChangeAnswer = (value, prop, index) => {
    const answerListState = ansewerList;
    answerListState[index][prop] = value;
    setAnswerList(answerListState);
  };

  const validateUrl = () => {
    if (currentVideo.videoUrl === '') {
      return true;
    }
    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    return urlRegex.test(currentVideo.videoUrl);
  };

  const renderAnswers = () => {
    return ansewerList.map((anItem, index) => {
      return (
        <div className={'answer-item'}>
          <div className={'answer-index'}></div>
          <div className={'answer-description'}>
            <Row>
              <FormControl fullWidth={true}>
                <InputLabel>{'Description'}</InputLabel>
                <Input
                  value={anItem.description}
                  onChange={event =>
                    handleChangeAnswer(event.target.value, 'description', index)
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
                  value={anItem.urlAfterAnser}
                  onChange={event =>
                    handleChangeAnswer(
                      event.target.value,
                      'urlAfterAnser',
                      index
                    )
                  }
                ></Input>
              </FormControl>
            </Row>
          </div>
          <div className={'answer-correct'}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={anItem.isCorrect}
                    onChange={event =>
                      handleChangeAnswer(
                        event.target.checked,
                        'isCorrect',
                        index
                      )
                    }
                  />
                }
                label='Gilad Gray'
              />
            </FormGroup>
          </div>
        </div>
      );
    });
  };

  return (
    <div className={'form-container'}>
      <Row
        className={css(styles.container)}
        horizontal='start'
        vertical='center'
      >
        <Column className={css(styles.input)} flexGrow={1}>
          <FormControl fullWidth={true}>
            <InputLabel>{'Tile*'}</InputLabel>
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
              error={!validateUrl()}
              onChange={event => handleChange(event.target.value, 'videoUrl')}
            ></Input>
            <FormHelperText
              hidden={validateUrl()}
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
              name={'IsnputVideoUrl'}
              value={currentVideo.question}
              onChange={event => handleChange(event.target.value, 'question')}
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
          <InputLabel className={css(styles.answerLabel)}>
            {'Answers*'}
          </InputLabel>
          <div className={css(styles.answerContiner)}>
            {renderAnswers()}
            <div className='button-answer-container'>
              <Button
                variant='contained'
                color='primary'
                disabled={ansewerList.length > 5}
              >
                Add Answer
              </Button>
            </div>
          </div>
        </Column>
      </Row>
    </div>
  );
};

export default Layout;
