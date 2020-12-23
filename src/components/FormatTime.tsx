const formatTime = (inputNumber: number) => {
  if (inputNumber >= 60) {
    inputNumber /= 60;
    return inputNumber.toFixed(2) + " minutes";
  } else {
    return inputNumber + " seconds";
  }
};

export default formatTime;
