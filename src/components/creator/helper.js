export const canSave = (currentVideo, answers) => {
  return (
    currentVideo &&
    currentVideo.title !== '' &&
    currentVideo.videoUrl !== '' &&
    currentVideo.question !== '' &&
    answers.length > 0
  );
};

export const validateUrl = url => {
  if (url === '') {
    return true;
  }
  const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  return urlRegex.test(url);
};
