var month = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const getDecoratedDate = (dateAsString: string): string => {
  const newDate = new Date(dateAsString);
  let decoratedDate =
    newDate.getDate() +
    ' ' +
    month[newDate.getMonth()] +
    ' ' +
    newDate.getFullYear();
  return decoratedDate;
};

export const getDecoratedDateExcludeMonthName = (
  dateAsString: string
): string => {
  const newDate = new Date(dateAsString);
  let decoratedDate =
    newDate.getDate() + '.' + newDate.getMonth() + '.' + newDate.getFullYear();
  return decoratedDate;
};

export const getDecoratedTime = (
  dateAsString: string,
  endTime?: number | undefined
): string => {
  const newDate = new Date(dateAsString);
  let hours: string | number = newDate.getHours();
  let minutes: string | number = newDate.getMinutes();
  if (endTime) {
    minutes += endTime;
    hours = minutes >= 60 ? hours + 1 : hours;
    minutes = minutes >= 60 ? minutes - 60 : minutes;
  }
  let ampm = hours >= 12 ? 'PM' : 'PM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  const decoratedTime = hours + ':' + minutes + ' ' + ampm;
  return decoratedTime;
};
