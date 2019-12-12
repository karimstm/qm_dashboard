import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { stoppagePieChartOptions } from "../../variables/charts";

require("highcharts/modules/drilldown")(Highcharts);

export class PieChart extends Component {
  render() {
    const { seriesOptions, drilldownSeries, getEvent } = this.props;
    return (
      <div style={{ height: "397px" }}>
        <HighchartsReact
          highcharts={Highcharts}
          options={stoppagePieChartOptions(
            seriesOptions,
            drilldownSeries,
            getEvent
          )}
        />
      </div>
    );
  }
}

export default PieChart;
