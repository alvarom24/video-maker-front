import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import VideoPlayer from '../shared/videoplayer/VideoPlayer';
import QuestionModal from './QuestionModal';
import FinalizationModal from './FinalizationModal';
import EmailModal from './EmailModal';

const styles = StyleSheet.create({
  container: {
    marginLeft: 32,
    marginRight: 32,
  },
});

const Layout = props => {
  useEffect(() => {
    openEmailModal();
  }, [props.video]);
  const { answers } = props.video;
  const parsedAnswers = JSON.parse(answers).map(answer => {
    answer.checked = false;
    return answer;
  });
  const [isOpenModalQuestion, setIsOpenModalQuestion] = useState(false);
  const [isStoppedPlayer, setisStoppedPlayer] = useState(true);
  const [wasModalOppened, setWasModalOppened] = useState(false);
  const [anseweredList, setAnsweredList] = useState(parsedAnswers);
  const [answeredSucessfull, setAnsweredSucessfull] = useState(false);
  const [isOpenModalFinalization, setIsOpenModalFinalization] = useState(false);
  const [isOpenEmailModal, setIsOpenEmailModal] = useState(false);
  const [currentEmail, setCurrentEmail] = useState('');

  const canRender = () => {
    return props && props.video;
  };

  const handleOnProgress = played => {
    setisStoppedPlayer(false);
    setIsOpenModalQuestion(true);
    setWasModalOppened(true);
  };

  const openEmailModal = () => {
    setIsOpenEmailModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModalQuestion(false);
  };

  const onChangeAnswerSelection = (checked, index) => {
    const anseweredListState = anseweredList;
    anseweredListState[index].checked = checked;
    setAnsweredList([...anseweredListState]);
    if (anseweredListState[index].urlAfterAnser) {
      window.open(anseweredListState[index].urlAfterAnser, '_blank');
    }
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

    if (results.length >= correctAnswers.length / 2) {
      setAnsweredSucessfull(true);
    }
    setIsOpenModalFinalization(true);
  };

  const handleCloseFinishModal = () => {
    setIsOpenModalFinalization(false);
    window.location.reload();
  };

  const onStartWithEmail = email => {
    setCurrentEmail(email);
    setIsOpenEmailModal(false);
  };

  if (canRender() && currentEmail !== '') {
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
            key={'qModal'}
            answers={anseweredList}
            video={props.video}
            open={isOpenModalQuestion}
            handleCloseModal={handleCloseModal}
            onChangeAnswerSelection={(checked, index) =>
              onChangeAnswerSelection(checked, index)
            }
          />
          <FinalizationModal
            key={'fModal'}
            open={isOpenModalFinalization}
            succeed={answeredSucessfull}
            handleCloseFinishModal={() => handleCloseFinishModal()}
            anseweredList={anseweredList}
          />
        </Row>
      </Fragment>
    );
  } else {
    return (
      <EmailModal
        open={isOpenEmailModal}
        onProceed={email => onStartWithEmail(email)}
      />
    );
  }
};

Layout.propTypes = {
  courseRecord: PropTypes.shape({}),
};

export default Layout;
