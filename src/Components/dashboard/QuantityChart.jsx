import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { quantityChartOptions } from "../../variables/charts";

class QuantityChart extends Component {
  constructor(props) {
    super(props);
    this.afterChartCreated = this.afterChartCreated.bind(this);
  }
  afterChartCreated(chart) {}

  render() {
    return (
      <HighchartsReact
        highcharts={Highcharts}
        options={quantityChartOptions(this.props.seriesOptions)}
        callback={this.afterChartCreated}
      />
    );
  }
}

export default QuantityChart;
