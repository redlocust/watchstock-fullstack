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
        {
          data: []
        }
      ],

      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          day: '%d %b %Y'    //ex- 01 Jan 2016
        }
      },

      yAxis: {
        title: {
          text: '$'
        }
      },

      rangeSelector: {

        buttons: [{
          type: 'day',
          count: 3,
          text: '3d'
        }, {
          type: 'week',
          count: 1,
          text: '1w'
        }, {
          type: 'month',
          count: 1,
          text: '1m'
        }, {
          type: 'month',
          count: 6,
          text: '6m'
        }, {
          type: 'year',
          count: 1,
          text: '1y'
        }, {
          type: 'all',
          text: 'All'
        }],
        selected: 3
      },

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

      while (this.chart.series.length > 0)
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