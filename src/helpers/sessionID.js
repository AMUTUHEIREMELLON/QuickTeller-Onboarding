const makeSessionID = () => {
  return Math.floor(Math.random() * 100000);
};

export default makeSessionID;
