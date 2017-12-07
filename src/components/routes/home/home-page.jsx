import React from 'react';
import Spinner from 'react-spinkit';

import DataTables from 'material-ui-datatables';

import { Card, CardHeader } from 'material-ui/Card';

import Button from '../../ui/Button/Button';
import SearchService from '../../../services/search.service';
import DateTools from '../../../tools/date-tools';

import './home-page.scss';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: DateTools.addYears(-5),
      to: new Date(),
      page: 1,
      columns: [
        {
          key: 'id',
          sortable: true,
          label: 'Id',
        }, {
          key: 'city',
          sortable: true,
          label: 'City',
        }, {
          key: 'start_date',
          sortable: true,
          label: 'Start date',
        }, {
          key: 'end_date',
          sortable: true,
          label: 'End date',
        }, {
          key: 'price',
          sortable: true,
          label: 'Price',
          alignRight: true,
        }, {
          key: 'status',
          sortable: true,
          label: 'Status',
        }, {
          key: 'color',
          sortable: true,
          label: 'Color',
        },
      ],
      data: [],
      queryInProgress: false,
    };
    this.delayTimer = null;
    this.searchService = new SearchService();
    this.handleSortOrderChange = this.handleSortOrderChange.bind(this);
    this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
  }

  componentDidMount() {
    this.doSearch();
  }

  componentWillUnmount() {
  }

  componentDidUpdate(prevProps, prevState) {
    const elems = document.querySelectorAll('div.results table tbody tr td:nth-child(7)');
    elems.forEach((elem) => {
      const color = elem.innerHTML;
      if (color.startsWith('#')) {
        elem.innerHTML = `<span style="color:${color}">${color}</span>`;
      }
    });
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

  handlePreviousPageClick() {
    console.log('handlePreviousPageClick');
    this.setPage(this.state.page - 1);
  }

  handleNextPageClick() {
    console.log('handleNextPageClick');
    this.setPage(this.state.page + 1);
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

  doSearch(timeout = 1) {
    clearTimeout(this.delayTimer);
    this.delayTimer = setTimeout(() => {
      this.showProgress(true);
      const from = DateTools.formatDate(this.state.from);
      const to = DateTools.formatDate(this.state.to);
      this.searchService.search(from, to, (this.state.page - 1) * 10, 10)
        .then(
        (result) => {
          console.log(`Result for ${from}, ${to}`);
          // console.log(result);
          this.showProgress(false);
          this.setState({
            ...this.state,
            data: result,
          });
          this.forceUpdate();
        },
        (error) => {
          if (this.state.page > 1) {
            this.setPage(this.state.page - 1);
          } else {
            this.showProgress(false);
            this.setState({
              ...this.state,
              data: [],
            });
            this.forceUpdate();
          }
        }
        );
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

    //    this.doSearch();
  }

  render() {
    return (
      <Card style={{ margin: 12, textAlign: 'left' }}>
        <CardHeader
          title="Sms task"
          titleStyle={{ fontSize: 20 }}
        />

        <div className="filter">
          <div>
            <label
              htmlFor="fromDate"
            >
              From date
            </label>
            <input
              value={DateTools.formatDate(this.state.from)}
              id="fromDate"
              type="date"
              onChange={(evt) => this.updateFilter(evt.target.value, this.state.to)}
            />
          </div>
          <div>
            <label
              htmlFor="toDate"
            >
              To date
            </label>
            <input
              value={DateTools.formatDate(this.state.to)}
              if="toDate"
              type="date"
              onChange={(evt) => this.updateFilter(this.state.from, evt.target.value)}
            />
          </div>
          <div>
            <Button theme="blue" onClick={() => this.doSearch()}>Refresh</Button>
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
            page={this.state.page}
            count={1000}
            onNextPageClick={this.handleNextPageClick}
            onPreviousPageClick={this.handlePreviousPageClick}
            showCheckboxes={false}
            onSortOrderChange={this.handleSortOrderChange}
            initialSort={{ column: 'name', order: 'asc' }}
          />
        </div>
      </Card>
    );
  }
}

export default HomePage;
