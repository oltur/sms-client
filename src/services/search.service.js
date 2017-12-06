import $ from 'jquery';

class SearchService {
  search(from, to) {
    console.log(`Querying for ${from}, ${to}`);
    const url = `http://localhost:3000/sms?limit=100&$where=this.start_date%3E=ISODate(%27${from}%27)%26%26this.end_date%3C=ISODate(%27${to}%27)`;
    return $.get(url)
      .promise();
  }
}

export default SearchService;
