import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, Column } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import Modal from '@material-ui/core/Modal';

import VideoPlayer from '../shared/videoplayer/VideoPlayer';
import QuestionModal from './QuestionModal';
import FinalizationModal from './FinalizationModal';

const styles = StyleSheet.create({
  container: {
    marginLeft: 32,
    marginRight: 32,
  },
});

const Layout = props => {
  const { answers } = props.video;
  const parsedAnswers = JSON.parse(answers);
  const [isOpenModalQuestion, setIsOpenModalQuestion] = useState(false);
  const [isStoppedPlayer, setisStoppedPlayer] = useState(true);
  const [wasModalOppened, setWasModalOppened] = useState(false);
  const [anseweredList, setAnsweredList] = useState(parsedAnswers);
  const [answeredSucessfull, setAnsweredSucessfull] = useState(false);
  const [isOpenModalFinalization, setIsOpenModalFinalization] = useState(false);

  const canRender = () => {
    return props && props.video;
  };

  const handleOnProgress = played => {
    setisStoppedPlayer(false);
    setIsOpenModalQuestion(true);
    setWasModalOppened(true);
  };

  const handleCloseModal = () => {
    setIsOpenModalQuestion(false);
  };

  const onChangeAnswerSelection = (checked, index) => {
    const anseweredListState = anseweredList;
    anseweredListState[index].checked = checked;
    setAnsweredList([...anseweredListState]);
  };

  const handleFinishedVideo = () => {
    const userAnswers = anseweredList.filter(aItem => aItem.checked === true);
    const correctAnswers = anseweredList.filter(
      aItem => aItem.isCorrect === true
    );
    const results = [];
    userAnswers.forEach(aItem => {
      const isCorrectAnswered = correctAnswers.find(p => p.key === aItem.key);
      if (isCorrectAnswered) {
        results.push(aItem);
      }
    });

    if (results.length > correctAnswers.length / 2) {
      setAnsweredSucessfull(true);
    }
    setIsOpenModalFinalization(true);
  };

  const handleCloseFinishModal = () => {
    setIsOpenModalFinalization(false);
    window.location.reload();
  };

  if (canRender()) {
    return (
      <Fragment>
        <div className='center'>
          <h2>{props.video.title}</h2>
        </div>
        <Row
          className={css(styles.container)}
          horizontal='center'
          vertical='center'
        >
          <VideoPlayer
            key={'vplayer'}
            url={props.video.videoUrl}
            handleShowedQuestion={() => handleOnProgress()}
            playing={isStoppedPlayer}
            prompAt={props.video.prompAt}
            wasModalOppened={wasModalOppened}
            onEnded={() => handleFinishedVideo()}
          />
          <QuestionModal
            answers={anseweredList}
            video={props.video}
            open={isOpenModalQuestion}
            handleCloseModal={handleCloseModal}
            onChangeAnswerSelection={(checked, index) =>
              onChangeAnswerSelection(checked, index)
            }
          />
          <FinalizationModal
            open={isOpenModalFinalization}
            succeed={answeredSucessfull}
            handleCloseFinishModal={() => handleCloseFinishModal()}
          />
        </Row>
      </Fragment>
    );
  } else {
    return '';
  }
};

Layout.propTypes = {
  courseRecord: PropTypes.shape({}),
};

export default Layout;
