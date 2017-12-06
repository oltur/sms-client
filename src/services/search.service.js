import $ from 'jquery';
import DateTools from '../tools/date-tools';

class SearchService {
  search(from, to) {
    console.log(`Querying for ${from}, ${to}`);
    const url = `http://localhost:3000/sms?limit=2000&$where=this.start_date%3E=ISODate(%27${from}%27)%26%26this.end_date%3C=ISODate(%27${to}%27)`;
    return $.get(url)
      .promise().then((data) => {
        data.forEach((el) => {
          el.start_date = DateTools.formatDate(new Date(el.start_date));
          el.end_date = DateTools.formatDate(new Date(el.end_date));
          el.created = DateTools.formatDateTime(new Date(el.created));
          el.updated = DateTools.formatDateTime(new Date(el.updated));
          el.price = parseFloat(el.price);
        });
        return Promise.resolve(data);
      });
  }
}

export default SearchService;
