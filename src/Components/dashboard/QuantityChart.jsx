import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { quantityChartOptions } from "../../variables/charts";

require("highcharts/highcharts-3d")(Highcharts);
require("highcharts/modules/drilldown")(Highcharts);
require("highcharts/modules/data")(Highcharts);

class QuantityChart extends Component {
  constructor(props) {
    super(props);
    this.afterChartCreated = this.afterChartCreated.bind(this);
  }

  afterChartCreated(chart) {
    this.props.getChart(chart);
  }

  render() {
    const { seriesOptions, drilldownSeries, getEvent } = this.props;
    return (
      <HighchartsReact
        highcharts={Highcharts}
        options={quantityChartOptions(
          seriesOptions,
          drilldownSeries,
          getEvent,
          Highcharts
        )}
        callback={this.afterChartCreated}
      />
    );
  }
}

export default QuantityChart;
