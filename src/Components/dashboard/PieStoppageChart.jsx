import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { stoppagePieChartOptions } from "../../variables/charts";

require("highcharts/modules/drilldown")(Highcharts);

export class PieChart extends Component {
  render() {
    const { seriesOptions, drillDownSeries, getEvent } = this.props;
    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={stoppagePieChartOptions(
            seriesOptions,
            drillDownSeries,
            getEvent
          )}
        />
      </div>
    );
  }
}

export default PieChart;
