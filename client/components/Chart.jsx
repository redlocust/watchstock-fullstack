import React, {Component} from 'react';
import Highcharts from 'highcharts/highstock';
import $ from 'jquery';

class Chart extends Component {

  componentDidMount() {

    console.log("mount ", this.props.options);

    var options = {

      title: {
        text: 'Stock data from www.quandl.com'
      },

      series: [
        {data: []}
      ]
    };

    this.chart = new Highcharts.StockChart(
      this.refs.chart,
      options
    );
  }


  componentWillReceiveProps(nextProps) {
    console.log('next ', nextProps);

  }

  componentDidUpdate(prevProps, prevState) {
    console.log("prevProps", prevProps);
    console.log("curProps", this.props);
    console.log("thisChart", this.chart);

    if (this.props.options.length > 0) {

      while(this.chart.series.length > 0)
        this.chart.series[0].remove(true);

      for (let y = this.props.options.length - 1; y >= 0; y--) {
        this.chart.addSeries(this.props.options[y]);
      }
    }
  }


  componentWillUnmount() {
    this.chart.destroy();
  }

  render() {
    return (
      <div id="chart" ref="chart"/>
    )
  }
}

export default Chart;