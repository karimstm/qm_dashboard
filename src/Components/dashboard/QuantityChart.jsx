import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { quantityChartOptions } from "../../variables/charts";

require("highcharts/modules/drilldown")(Highcharts);

class QuantityChart extends Component {
  constructor(props) {
    super(props);
    this.afterChartCreated = this.afterChartCreated.bind(this);
  }
  afterChartCreated(chart) {}

  render() {
    const { seriesOptions, drilldownSeries } = this.props;
    return (
      <HighchartsReact
        highcharts={Highcharts}
        options={quantityChartOptions(seriesOptions, drilldownSeries)}
        callback={this.afterChartCreated}
      />
    );
  }
}

export default QuantityChart;
