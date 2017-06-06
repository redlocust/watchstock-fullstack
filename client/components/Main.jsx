import React, {Component} from 'react';
import Chart from './Chart.jsx';
import AddStock from './AddStock.jsx';
import axios from 'axios';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: [
        {
          data: [],
          name: ''
        }
      ]
    };
    this.handleAddStock = this.handleAddStock.bind(this);
  }

  componentWillMount() {
    let that = this;
    let url = 'api/stocks';

    fetch(url)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function (data) {
        let stocks = data.stocks.map((elem) => {

            let url = `https://www.quandl.com/api/v3/datasets/WIKI/${elem.code}/data.json?api_key=ybCTqaxu8RR7W5nCsdf-`

            fetch(url)
              .then(function (response) {
                if (response.status >= 400) {
                  throw new Error("Bad response from server");
                }
                return response.json();
              })
              .then(function (data) {
                let dataset = data.dataset_data.data.map(elem => elem['1']);
                let dataArray = that.state.dataArray;
                dataArray.push({data: dataset, name: elem.code});
                that.setState({dataArray});
                console.log(that.state.dataArray);
              });

            return elem.code
          }
        );
        console.log(stocks);
      });

  }

  handleAddStock(stockId) {

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
        console.log(res)
      })
      .catch(function (res) {
        console.log(res)
      })
  }

  render() {
    const options = {
      title: {
        text: 'Stock charts'
      },
      xAxis: {
        categories: ['Apples', 'Bananas', 'Oranges']
      },
      yAxis: {
        title: {
          text: 'Fruit eaten'
        }
      },
      chart: {
        type: 'line'
      },
      series: this.state.dataArray
    };


    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <Chart options={options}/>
        <AddStock handleAddStock={this.handleAddStock}/>
      </div>
    );
  }
}

export default Main;
