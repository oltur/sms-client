class DateTools {
  static formatDate(date) {
    const d = new Date(date);
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = d.getFullYear();

    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    return [year, month, day].join('-');
  }

  static formatDateTime(date) {
    const d = new Date(date);
    let hours = `${d.getHours()}`;
    let minutes = `${d.getMinutes()}`;
    let seconds = `${d.getSeconds()}`;

    if (hours.length < 2) hours = `0${hours}`;
    if (minutes.length < 2) minutes = `0${minutes}`;
    if (seconds.length < 2) seconds = `0${seconds}`;

    return `${DateTools.formatDate(date)} ${[hours, minutes, seconds].join(':')}`;
  }
}

export default DateTools;