import React, { Component } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import { stoppageAreaChartOptions } from "../../variables/charts";

class StoppageChart extends Component {
  constructor(props) {
    super(props);
    this.afterChartCreated = this.afterChartCreated.bind(this);
  }

  afterChartCreated(chart) {
    this.props.getChart(chart);
  }

  render() {
    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={"stockChart"}
          options={stoppageAreaChartOptions(this.props.seriesOptions)}
          callback={this.afterChartCreated}
        />
      </div>
    );
  }
}

export default StoppageChart;
