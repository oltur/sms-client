class DateTools {
  static parseDate(s) {
    const b = s.split(/\D/);
    return new Date(b[0], --b[1], b[2]);
  }

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

  static addYears(years = -5, date = new Date()) {
    const d = date;
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();
    const result = new Date(year + years, month, day);
    return result;
  }
}

export default DateTools;
