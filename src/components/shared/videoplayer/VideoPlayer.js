import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = props => {
  const handleOnProgress = played => {
    const mins = played.playedSeconds / 60;
    const prompsSec = props.prompAt * 60 + 0.88;
    if (mins >= props.prompAt && played.playedSeconds <= prompsSec) {
      props.handleShowedQuestion();
    }
  };

  return (
    <ReactPlayer
      url={props.url}
      controls={true}
      onProgress={progress => handleOnProgress(progress)}
      onEnded={() => props.onEnded()}
      playing={props.playing}
    ></ReactPlayer>
  );
};

export default VideoPlayer;
