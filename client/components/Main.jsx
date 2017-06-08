import React, {Component} from 'react';
import Chart from './Chart.jsx';
import AddStock from './AddStock.jsx';
import axios from 'axios';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: [],
      loading: true
    };
    this.handleAddStock = this.handleAddStock.bind(this);
    //this.updateStateWithData = this.updateStateWithData.bind(this);
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

            var myInit = {mode: 'cors',
            header: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'multipart/form-data'
            }};

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
    console.log('Did mount');
    this.updateStateWithData();
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
        that.updateStateWithData();
      })
      .catch(function (res) {
        console.log(res)
      })

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


    let loading = (this.state.loading) ? <p>loading</p> : <p>finish loading</p>;

    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        {loading}
        <Chart options={options}/>
        <AddStock handleAddStock={this.handleAddStock}/>
      </div>
    );
  }
}

export default Main;
