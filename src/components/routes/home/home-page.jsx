import React from 'react';
import Spinner from 'react-spinkit';

import DataTables from 'material-ui-datatables';

import { Card, CardHeader } from 'material-ui/Card';

// import Button from '../../ui/Button/Button';
// import ListItem from '../../business/list-item/list-item';
import SearchService from '../../../services/search.service';

// import Person from '../../../models/person';
import './home-page.scss';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: this.formatDate(this.addYears(-5)),
      to: this.formatDate(new Date()),
      page: 1,
      columns: [
        {
          key: 'city',
          sortable: true,
          label: 'City',
        }, {
          key: 'start_date',
          sortable: true,
          label: 'Start date',
        }, {
          key: 'endt_date',
          sortable: true,
          label: 'End date',
        },
      ],
      data: [],
      queryInProgress: false,
    };
    this.delayTimer = null;
    this.searchService = new SearchService();
    this.handleSortOrderChange = this.handleSortOrderChange.bind(this);
  }

  componentDidMount() {
    this.doSearch();
  }

  componentWillUnmount() {
  }

  get hasData() {
    return (this.state.data && this.state.data.length > 0);
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

  addYears(years = -5, date = new Date()) {
    const d = date;
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();
    const result = new Date(year + years, month, day);
    return result;
  }

  formatDate(date) {
    const d = new Date(date);
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = d.getFullYear();

    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    return [year, month, day].join('-');
  }

  handleSortOrderChange(key, order) {
    function comparatorAsc(a, b) {
      if (a[key] > b[key]) { return 1; }
      if (a[key] === b[key]) { return 0; }
      return -1;
    }
    function comparatorDesc(a, b) {
      return comparatorAsc(a, b) * -1;
    }
    this.setState({
      ...this.state,
      data: this.state.data.sort(order === 'asc' ? comparatorAsc : comparatorDesc),
    });
  }

  doSearch(timeout = 300) {
    clearTimeout(this.delayTimer);
    this.delayTimer = setTimeout(() => {
      this.showProgress(true);
      this.searchService.search(this.state.from, this.state.to).then((result) => {
        console.log(`Result for ${this.state.from}, ${this.state.to}`);
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

  updateFilter(from, to) {
    this.setState({
      ...this.state,
      from,
      to,
      page: 1,
    });

    this.doSearch();
  }

  render() {
    // //console.log(this.state.data.data);
    // const navPrev =
    //   this.hasData && this.state.data.hasPrev ?
    //     (
    //       <Button theme="blue" onClick={() => this.setPage(this.state.page - 1)}>Prev</Button>
    //     )
    //     : null;

    // const navNext =
    //   this.hasData && this.state.data.hasNext ?
    //     (
    //       <Button theme="blue" onClick={() => this.setPage(this.state.page + 1)}>Next</Button>
    //     )
    //     : null;


    // const listItems = this.hasData ?
    //   this.state.data.data.map((item) =>
    //     (
    //       <ListItem key={item.id} item={new Person(item)} />
    //     )) : (<div>No data</div>);

    return (
      <Card style={{ margin: 12, textAlign: 'left' }}>
        <CardHeader
          title="Sms task"
          titleStyle={{ fontSize: 20 }}
        />

        <div className="search">
          <div className="group">
            <label
              htmlFor="fromDate"
            >
              From date
            </label>
            <input
              id="fromDate"
              type="date"
              value={this.state.from}
              onChange={(evt) => this.updateFilter(evt.target.value, this.state.to)}
            />
          </div>
          <div className="group">
            <label
              htmlFor="toDate"
            >
              To date
            </label>
            <input
              id="toDate"
              type="date"
              value={this.state.to}
              onChange={(evt) => this.updateFilter(this.state.from, evt.target.value)}
            />
          </div>
        </div>
        <div className="results">
          {this.state.queryInProgress ?
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
            : null}
          <DataTables
            height="auto"
            selectable={false}
            showRowHover
            columns={this.state.columns}
            data={this.state.data}
            showCheckboxes={false}
            onSortOrderChange={this.handleSortOrderChange}
            initialSort={{ column: 'name', order: 'asc' }}
            page={1}
            count={100}
          />
        </div>
      </Card>
    );
  }
}

export default HomePage;
