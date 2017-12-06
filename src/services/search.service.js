import $ from 'jquery';

class SearchService {
  search(query, page) {
    //console.log(`Querying for ${query}`);
    return $.get(`https://klarna-187423.appspot.com/api/search?query=${query}&page=${page}`)
      .promise();
  }
}

export default SearchService;
