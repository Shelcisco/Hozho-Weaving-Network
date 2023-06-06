const addDateSuffix = date => {
  let dateStr = date.toString();

  // get last char of date string
  const lastChar = dateStr.charAt(dateStr.length - 1);

  if (lastChar === '1' && dateStr !== '11') {
    dateStr = `${dateStr}st`;
  } else if (lastChar === '2' && dateStr !== '12') {
    dateStr = `${dateStr}nd`;
  } else if (lastChar === '3' && dateStr !== '13') {
    dateStr = `${dateStr}rd`;
  } else {
    dateStr = `${dateStr}th`;
  }

  return dateStr;
};

module.exports = (
  timestamp,
  { monthLength = 'short', dateSuffix = true } = {}
) => {
  const months = {
    0: monthLength === 'short' ? 'Jan' : 'January',
    1: monthLength === 'short' ? 'Feb' : 'February',
    2: monthLength === 'short' ? 'Mar' : 'March',
    3: monthLength === 'short' ? 'Apr' : 'April',
    4: monthLength === 'short' ? 'May' : 'May',
    5: monthLength === 'short' ? 'Jun' : 'June',
    6: monthLength === 'short' ? 'Jul' : 'July',
    7: monthLength === 'short' ? 'Aug' : 'August',
    8: monthLength === 'short' ? 'Sep' : 'September',
    9: monthLength === 'short' ? 'Oct' : 'October',
    10: monthLength === 'short' ? 'Nov' : 'November',
    11: monthLength === 'short' ? 'Dec' : 'December'
  };

  const dateObj = new Date(timestamp);

  // Get the date components adjusted to the current timezone
  const formattedMonth = months[dateObj.getMonth()];
  const dayOfMonth = dateSuffix
    ? addDateSuffix(dateObj.getDate())
    : dateObj.getDate();
  const year = dateObj.getFullYear();
  const hour = dateObj.toLocaleString('en-US', { hour: 'numeric', hour12: true }).replace(/\s?[AP]M/, '');
  const minutes = dateObj.getMinutes();
  const periodOfDay = dateObj.toLocaleString('en-US', { hour: 'numeric', hour12: true, hourCycle: 'h12', timeZoneName: 'short' }).split(' ')[1];
  const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes.toString().padStart(2, '0')} ${periodOfDay}`;

  return formattedTimeStamp;
};
