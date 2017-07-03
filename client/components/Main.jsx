import React, {Component} from 'react';
import Chart from './Chart.jsx';
import AddStock from './AddStock.jsx';
import StocksList from './StocksList';

let socket = io();

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: [],
      loading: true
    };
    this.handleAddStock = this.handleAddStock.bind(this);
    this.handleDeleteStock = this.handleDeleteStock.bind(this);
  }

  updateStateWithData() {
    let that = this;
    let url = 'api/stocks';

    this.setState({
      dataArray: [],
      loading: true
    });

    fetch(url)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function (dat) {
        let numOfCompletedFetch = 0;
        let stocks = dat.stocks.map(function (elem) {

            var myInit = {
              mode: 'cors',
              header: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'multipart/form-data'
              }
            };

            let url = `https://www.quandl.com/api/v3/datasets/WIKI/${elem.code}/data.json?api_key=ybCTqaxu8RR7W5nCsdf-`

            fetch(url, myInit)
              .then(function (response) {
                if (response.status >= 400) {
                  throw new Error("Bad response from server");
                }
                return response.json();
              })
              .then(function (data) {
                let dataset = data.dataset_data.data.map(el => el['1']);
                let dataArray = that.state.dataArray;
                console.log(dataArray);
                dataArray.push({data: dataset, name: elem.code});
                numOfCompletedFetch++;
                if (numOfCompletedFetch === dat.stocks.length) {
                  that.setState({dataArray});
                }
              });

            return elem.code
          }
        );
        console.log(stocks);
      });
  }


  componentDidMount() {
    let that = this;
    this.updateStateWithData();
    socket.on('UPDATE', function (msg) {
      console.log('update');
      that.updateStateWithData();
    })
  }

  handleAddStock(stockId) {
    let that = this;

    fetch("/api/stocks/",
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({code: stockId})
      })
      .then(function (res) {
        console.log('completed');
      })
      .catch(function (res) {
        console.log(res)
      });

    socket.emit('ADD_STOCK', stockId);

  }

  handleDeleteStock(stockId) {
    console.log(stockId);
    console.log(this.state.dataArray.findIndex((elem, index) => elem.name === stockId));

    let that = this;

    let url = `/api/stocks/${stockId}`;

    fetch(url,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "DELETE",
      })
      .then(() => {
        console.log('delete stock')
      })
      .catch(function (res) {
        console.log('error delete stock');
        console.log(res);
      });

    socket.emit('DELETE_STOCK', stockId);
  }

  render() {
    const options = {

      rangeSelector: {
        selected: 1
      },
      chart: {
        type: 'line'
      },
      series: this.state.dataArray
    };


    let loading = (this.state.loading) ? <p>loading stock</p> : <p>finish loading</p>;

    return (
      <div className="App row">
        <div className="col-md-6 col-md-offset-3">
          <div className="App-header">
            <h2>Welcome to React</h2>
          </div>
          {loading}
          <Chart options={options}/>
          <AddStock handleAddStock={this.handleAddStock}/>
          <StocksList dataArray={this.state.dataArray} handleDeleteStock={this.handleDeleteStock}/>
        </div>
      </div>
    );
  }
}

export default Main;
