import dayjs from "dayjs";

export const formatTime = (inputNumber: number) => {
  if (inputNumber >= 60) {
    const hour = Math.floor(inputNumber / 3600);

    const min = (inputNumber - hour * 3600) / 60;
    const value =
      hour === 0
        ? min.toFixed(0) + " min"
        : hour.toFixed(0) + " hr, " + min.toFixed(0) + " min";
    return value;
  } else {
    return inputNumber + " sec";
  }
};

export const formatDateTime = (inputDate: string) => {
  const date = dayjs(inputDate);
  return date.format("dddd, MMMM D, YYYY h:mm A");
};

export const formatDate = (inputDate: string) => {
  const date = dayjs(inputDate);
  return date.format("dddd, MMMM D, YYYY");
};

export const formatDetailTime = (inputDate: string) => {
  const date = dayjs(inputDate);
  return date.format("h:mm A");
};

export const formatString = (inputString: string) => {
  return inputString.length > 20
    ? inputString.slice(0, 40) + "..."
    : inputString;
};
