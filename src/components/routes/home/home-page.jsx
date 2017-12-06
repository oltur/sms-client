import React from 'react';
import Spinner from 'react-spinkit';

import DataTables from 'material-ui-datatables';

import Button from '../../ui/Button/Button';
import ListItem from '../../business/list-item/list-item';
import SearchService from '../../../services/search.service';

import Person from '../../../models/person';
import './home-page.scss';

const TABLE_COLUMNS = [
  {
    key: 'name',
    label: 'Dessert (100g serving)',
  }, {
    key: 'calories',
    label: 'Calories',
  },

];

const TABLE_DATA = [
  {
    name: 'Frozen yogurt',
    calories: '159',
    fat: '6.0',
    carbs: '24',

  }, {
    name: 'Ice cream sandwich',
    calories: '159',
    fat: '6.0',
    carbs: '24',

  },

];

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labelVisibility: 'visible',
      searchInputValue: '',
      page: 1,
      data: [],
      queryInProgress: false,
    };
    this.delayTimer = null;
    this.searchService = new SearchService();
  }

  get hasData() {
    return (this.state.data && this.state.data.data && this.state.data.data.length > 0);
  }

  setPage(page) {
    if (page >= 1) {
      this.setState({
        ...this.state,
        page,
      });
      this.doSearch(1);
    }
  }

  handleFilterValueChange = (value) => {
    // your filter logic
  }

  handleSortOrderChange = (key, order) => {
    // your sort logic
  }

  doSearch(timeout = 1000) {
    clearTimeout(this.delayTimer);
    this.delayTimer = setTimeout(() => {
      this.showProgress(true);
      this.searchService.search(this.state.searchInputValue, this.state.page).then((result) => {
        console.log(`Result for ${this.state.searchInputValue}`);
        // console.log(result);
        this.showProgress(false);
        this.setState({
          ...this.state,
          data: result,
        });
        this.forceUpdate();
      });
    }, timeout); // Will do the ajax stuff after 1000 ms, or 1 s
  }

  showProgress(show) {
    if (show) {
      this.setState({
        ...this.state,
        queryInProgress: true,
      });
    } else {
      this.setState({
        ...this.state,
        queryInProgress: false,
      });
    }
  }

  updateInputValue(evt) {
    const searchInputValue = evt.target.value;

    const labelVisibility = (!searchInputValue) ?
      'visible' : 'hidden';

    this.setState({
      ...this.state,
      labelVisibility,
      searchInputValue,
      page: 1,
    });

    if (searchInputValue) {
      this.doSearch();
    }
  }

  render() {
    //console.log(this.state.data.data);
    const navPrev =
      this.hasData && this.state.data.hasPrev ?
        (
          <Button theme="blue" onClick={() => this.setPage(this.state.page - 1)}>Prev</Button>
        )
        : null;

    const navNext =
      this.hasData && this.state.data.hasNext ?
        (
          <Button theme="blue" onClick={() => this.setPage(this.state.page + 1)}>Next</Button>
        )
        : null;


    const listItems = this.hasData ?
      this.state.data.data.map((item) =>
        (
          <ListItem key={item.id} item={new Person(item)} />
        )) : (<div>No data</div>);

    return (
      <div>

        <h1 style={{ fontSize: 50, fontWeigth: 'bold', textAlign: 'center' }}>
          People Search for Klarna
        </h1>

        <DataTables
          height="auto"
          selectable={false}
          sortable
          showRowHover
          columns={TABLE_COLUMNS}
          data={TABLE_DATA}
          showCheckboxes={false}
          onCellClick={this.handleCellClick}
          onCellDoubleClick={this.handleCellDoubleClick}
          onFilterValueChange={this.handleFilterValueChange}
          onSortOrderChange={this.handleSortOrderChange}
          page={1}
          count={100}
        />

        <div className="search">
          <div className="cui__input giant">
            <label
              htmlFor="searchInput"
              className="cui__input__label"
              style={{ visibility: this.state.labelVisibility }}
            >
              Type your search query
            </label>
            <input
              id="searchInput"
              value={this.state.searchInputValue}
              onChange={(evt) => this.updateInputValue(evt)}
              className="cui__input__input"
            />
          </div>

          <div className="results">
            <div className="cui__selector--direct title">
              <h2 className="cui__selector--direct__title">
                Search results, page {this.state.page}
              </h2>
              {
                this.state.queryInProgress ?
                  <Spinner
                    name="ball-spin-fade-loader"
                    style={{
                      position: 'relative',
                      left: '50%',
                      top: '50px',
                      width: '100px',
                      zIndex: 1000,
                    }}
                  />
                  : null
              }
              <div className="navigation">
                {navPrev}{navNext}
              </div>
              {listItems}
              <div className="navigation">
                {navPrev}{navNext}
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default HomePage;
