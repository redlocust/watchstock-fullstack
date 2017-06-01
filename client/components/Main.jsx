import React, {Component} from 'react';
import Chart from './Chart.jsx';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {data: [0, 1, 2, 3]};
  }

  componentDidMount() {
    var that = this;
    var url = 'https://www.quandl.com/api/v3/datasets/WIKI/FB/data.json?api_key=ybCTqaxu8RR7W5nCsdf-';

    fetch(url)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(data) {
        let dataset = data.dataset_data.data.map( elem => elem['1']);

        that.setState({ data: dataset});
      });
  }

  render() {
    const options = {
      title: {
        text: 'Fruit Consumption'
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
      series: [{
        name: 'Jane',
        data: this.state.data
      }]
    };

    console.log(this.state.data);

    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <Chart options={options}/>
      </div>
    );
  }
}

export default Main;
