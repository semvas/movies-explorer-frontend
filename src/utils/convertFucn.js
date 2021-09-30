export const convertMinutesToHours = (minutes) => {
  let time;
  if(minutes >= 60) {
    time = (minutes / 60 | 0) + "ч " + minutes % 60 + "м" ;
  }
  else {
    time = minutes + "м"
  }
  return time;
};
