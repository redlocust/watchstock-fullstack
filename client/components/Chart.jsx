import React, {Component} from 'react';
import Highcharts from 'highcharts';

class Chart extends Component {

  componentWillReceiveProps(nextProps) {
    this.chart = new Highcharts[nextProps.type || "Chart"](
      this.refs.chart,
      nextProps.options
    );

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