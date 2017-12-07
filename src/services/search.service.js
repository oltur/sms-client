import $ from 'jquery';
import url from 'url';
import DateTools from '../tools/date-tools';

class SearchService {
  search(from, to, skip = 0, limit = 1000, sortKey = 'id', sortOrder = 'asc') {
    const baseUrl = 'http://localhost:3000/sms';
    const requestUrl = url.resolve(baseUrl, `?sortKey=${sortKey}&sortOrder=${sortOrder}&skip=${skip}&limit=${limit}&$where=this.end_date>=ISODate('${from}')%26%26this.start_date<=ISODate('${to}')%26%26this.start_date<=this.end_date`);
    console.log(requestUrl);
    return $.get(requestUrl)
      .promise().then(
        (data) => {
          data.forEach((el) => {
            el.start_date = DateTools.formatDate(new Date(el.start_date));
            el.end_date = DateTools.formatDate(new Date(el.end_date));
            el.created = DateTools.formatDateTime(new Date(el.created));
            el.updated = DateTools.formatDateTime(new Date(el.updated));
            el.price = parseFloat(el.price);
          });
          return Promise.resolve(data);
        },
        (error) => {
          console.log(error);
          return Promise.reject(error);
        }
      );
  }
}

export default SearchService;
