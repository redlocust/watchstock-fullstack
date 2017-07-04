import React, {Component} from 'react';
import Highcharts from 'highcharts/highstock';
import $ from 'jquery';

class Chart extends Component {

  componentDidMount() {

    var options = {

      yAxis: {
        labels: {
          formatter: function() {
            return this.value +' km';
          }
        }
      },

      series: [{
        data: []
      }]

    };


    console.log(document.getElementById('chart'));
    console.log(this.refs.chart);

    this.chart = new Highcharts.StockChart(
      this.refs.chart,
      options
    );
  }


  componentWillReceiveProps(nextProps) {
    //console.log(document.getElementById('chart'));
    // for (let i = this.chart.series.length-1; i>=0; i--) {
    //   this.chart.series[i].remove();
    // }
    // for (let y = new_serie.length-1; y >= 0; y--) {
    //   this.chart.addSeries(new_serie[y]);
    // }

    // this.chart = new Highcharts.StockChart(
    //   this.refs.chart,
    //   nextProps.options

  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  render() {
    return (
      <div ref="chart"/>
    )
  }
}

export default Chart;