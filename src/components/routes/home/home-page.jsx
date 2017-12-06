import React from 'react';
import Spinner from 'react-spinkit';

import DatePicker from 'material-ui/DatePicker';

import DataTables from 'material-ui-datatables';

import { Card, CardHeader } from 'material-ui/Card';

// import Button from '../../ui/Button/Button';
// import ListItem from '../../business/list-item/list-item';
import SearchService from '../../../services/search.service';
import DateTools from '../../../tools/date-tools';

import './home-page.scss';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: this.addYears(-5),
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
          alignRight: true  ,
        }, {
          key: 'status',
          sortable: true,
          label: 'Status',
        }, {
          key: 'color',
          sortable: true,
          label: 'Color',
        }, {
          key: 'created',
          sortable: true,
          label: 'Created',
        }, {
          key: 'updated',
          sortable: true,
          label: 'Updated',
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
      const from = DateTools.formatDate(this.state.from);
      const to = DateTools.formatDate(this.state.to);
      this.searchService.search(from, to).then((result) => {
        console.log(`Result for ${from}, ${to}`);
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

        <div className="filter">
          <label
            htmlFor="fromDate"
          >
              From date
          </label>
          <DatePicker
            hintText="fromDate"
            value={this.state.from}
            container="inline"
            onChange={(evt, date) => this.updateFilter(date, this.state.to)}
          />
          <label
            htmlFor="toDate"
          >
              To date
          </label>
          <DatePicker
            hintText="toDate"
            value={this.state.to}
            container="inline"
            onChange={(evt, date) => this.updateFilter(this.state.from, date)}
          />
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
            showFooterToolbar={false}
            onSortOrderChange={this.handleSortOrderChange}
            initialSort={{ column: 'name', order: 'asc' }}
          />
        </div>
      </Card>
    );
  }
}

export default HomePage;
