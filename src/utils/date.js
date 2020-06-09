const dateParser = (strDate) => {
  const [day, month, year, hour = 0, minutes = 0] = strDate.split(/[\. :]/);
  return new Date(year, parseInt(month) - 1, day, hour, minutes);
};

const period = (strPeriod) => {
    const [hour, minutes] = strPeriod.split(':');
    const firstDate = new Date(0);
    firstDate.setHours(parseInt(hour) + 4, minutes);
    return firstDate;
};
const toDateTimeFormat = (date) => {
    // "06.06.2020 01:15"
    return `${addZeroLess10(date.getDate())}.${addZeroLess10(date.getMonth() + 1)}.${date.getFullYear()} ${addZeroLess10(date.getHours())}:${addZeroLess10(date.getMinutes())}`
};

const addZeroLess10 = (val) => val > 10 ? val : `0${val}`;

module.exports = {
    dateParser, period, toDateTimeFormat
}
