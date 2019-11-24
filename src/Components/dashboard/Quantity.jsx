import React, { Component } from "react";
import { Card } from "antd";
// import moment from "moment";
import QuantityChart from "./QuantityChart";

// const { RangePicker } = DatePicker;

var seriesOptions = [
  {
    name: "DAP",
    data: [
      { x: Date.UTC(2019, 0, 1), y: 33, drilldown: "DAP" },
      { x: Date.UTC(2019, 1, 1), y: 33, drilldown: "DAP" },
      { x: Date.UTC(2019, 2, 1), y: 33, drilldown: "DAP" },
      { x: Date.UTC(2019, 3, 1), y: 33, drilldown: "DAP" },
      { x: Date.UTC(2019, 4, 1), y: 33, drilldown: "DAP" },
      { x: Date.UTC(2019, 5, 1), y: 33, drilldown: "DAP" },
      { x: Date.UTC(2019, 6, 1), y: 33, drilldown: "DAP" },
      { x: Date.UTC(2019, 7, 1), y: 33, drilldown: "DAP" },
      { x: Date.UTC(2019, 8, 1), y: 33, drilldown: "DAP" },
      { x: Date.UTC(2019, 9, 1), y: 33, drilldown: "DAP" },
      { x: Date.UTC(2019, 10, 1), y: 33, drilldown: "DAP" },
      { x: Date.UTC(2019, 11, 1), y: 33, drilldown: "DAP" }
    ],
    color: "#f38181"
  },
  {
    name: "MAP",
    drilldown: "MAP",
    color: "#fce38a",
    data: [
      { x: Date.UTC(2019, 0, 1), y: 33, drilldown: "MAP" },
      { x: Date.UTC(2019, 1, 1), y: 33, drilldown: "MAP" },
      { x: Date.UTC(2019, 2, 1), y: 33, drilldown: "MAP" },
      { x: Date.UTC(2019, 3, 1), y: 33, drilldown: "MAP" },
      { x: Date.UTC(2019, 4, 1), y: 33, drilldown: "MAP" },
      { x: Date.UTC(2019, 5, 1), y: 33, drilldown: "MAP" },
      { x: Date.UTC(2019, 6, 1), y: 33, drilldown: "MAP" },
      { x: Date.UTC(2019, 7, 1), y: 33, drilldown: "MAP" },
      { x: Date.UTC(2019, 8, 1), y: 33, drilldown: "MAP" },
      { x: Date.UTC(2019, 9, 1), y: 33, drilldown: "MAP" },
      { x: Date.UTC(2019, 10, 1), y: 33, drilldown: "MAP" },
      { x: Date.UTC(2019, 11, 1), y: 33, drilldown: "MAP" }
    ]
  },
  {
    name: "TSP",
    drilldown: "TSP",
    color: "#95e1d3",
    data: [
      { x: Date.UTC(2019, 0, 1), y: 33, drilldown: "TSP" },
      { x: Date.UTC(2019, 1, 1), y: 33, drilldown: "TSP" },
      { x: Date.UTC(2019, 2, 1), y: 33, drilldown: "TSP" },
      { x: Date.UTC(2019, 3, 1), y: 33, drilldown: "TSP" },
      { x: Date.UTC(2019, 4, 1), y: 33, drilldown: "TSP" },
      { x: Date.UTC(2019, 5, 1), y: 33, drilldown: "TSP" },
      { x: Date.UTC(2019, 6, 1), y: 33, drilldown: "TSP" },
      { x: Date.UTC(2019, 7, 1), y: 33, drilldown: "TSP" },
      { x: Date.UTC(2019, 8, 1), y: 33, drilldown: "TSP" },
      { x: Date.UTC(2019, 9, 1), y: 33, drilldown: "TSP" },
      { x: Date.UTC(2019, 10, 1), y: 33, drilldown: "TSP" },
      { x: Date.UTC(2019, 11, 1), y: 33, drilldown: "TSP" }
    ]
  },
  {
    name: "NPK",
    drilldown: "NPK",
    color: "#D6C1AB",
    data: [
      { x: Date.UTC(2019, 0, 1), y: 33, drilldown: "NPK" },
      { x: Date.UTC(2019, 1, 1), y: 33, drilldown: "NPK" },
      { x: Date.UTC(2019, 2, 1), y: 33, drilldown: "NPK" },
      { x: Date.UTC(2019, 3, 1), y: 33, drilldown: "NPK" },
      { x: Date.UTC(2019, 4, 1), y: 33, drilldown: "NPK" },
      { x: Date.UTC(2019, 5, 1), y: 33, drilldown: "NPK" },
      { x: Date.UTC(2019, 6, 1), y: 33, drilldown: "NPK" },
      { x: Date.UTC(2019, 7, 1), y: 33, drilldown: "NPK" },
      { x: Date.UTC(2019, 8, 1), y: 33, drilldown: "NPK" },
      { x: Date.UTC(2019, 9, 1), y: 33, drilldown: "NPK" },
      { x: Date.UTC(2019, 10, 1), y: 33, drilldown: "NPK" },
      { x: Date.UTC(2019, 11, 1), y: 33, drilldown: "NPK" }
    ]
  },
  {
    name: "ASP",
    drilldown: "ASP",
    color: "#D5E5A3",
    data: [
      { x: Date.UTC(2019, 0, 1), y: 33, drilldown: "ASP" },
      { x: Date.UTC(2019, 1, 1), y: 33, drilldown: "ASP" },
      { x: Date.UTC(2019, 2, 1), y: 33, drilldown: "ASP" },
      { x: Date.UTC(2019, 3, 1), y: 33, drilldown: "ASP" },
      { x: Date.UTC(2019, 4, 1), y: 33, drilldown: "ASP" },
      { x: Date.UTC(2019, 5, 1), y: 33, drilldown: "ASP" },
      { x: Date.UTC(2019, 6, 1), y: 33, drilldown: "ASP" },
      { x: Date.UTC(2019, 7, 1), y: 33, drilldown: "ASP" },
      { x: Date.UTC(2019, 8, 1), y: 33, drilldown: "ASP" },
      { x: Date.UTC(2019, 9, 1), y: 33, drilldown: "ASP" },
      { x: Date.UTC(2019, 10, 1), y: 33, drilldown: "ASP" },
      { x: Date.UTC(2019, 11, 1), y: 33, drilldown: "ASP" }
    ]
  },
  {
    name: "NPS",
    drilldown: "NPS",
    color: "#B8D8D8",
    data: [
      { x: Date.UTC(2019, 0, 1), y: 33, drilldown: "NPS" },
      { x: Date.UTC(2019, 1, 1), y: 33, drilldown: "NPS" },
      { x: Date.UTC(2019, 2, 1), y: 33, drilldown: "NPS" },
      { x: Date.UTC(2019, 3, 1), y: 33, drilldown: "NPS" },
      { x: Date.UTC(2019, 4, 1), y: 33, drilldown: "NPS" },
      { x: Date.UTC(2019, 5, 1), y: 33, drilldown: "NPS" },
      { x: Date.UTC(2019, 6, 1), y: 33, drilldown: "NPS" },
      { x: Date.UTC(2019, 7, 1), y: 33, drilldown: "NPS" },
      { x: Date.UTC(2019, 8, 1), y: 33, drilldown: "NPS" },
      { x: Date.UTC(2019, 9, 1), y: 33, drilldown: "NPS" },
      { x: Date.UTC(2019, 10, 1), y: 33, drilldown: "NPS" },
      { x: Date.UTC(2019, 11, 1), y: 33, drilldown: "NPS" }
    ]
  }
];

var drilldownSeries = [
  {
    name: "DAP",
    id: "DAP",
    data: [
      { name: "DAP EURO", y: 23, drilldown: "DAP_" },
      { name: "DAP USA", y: 13, drilldown: "DAP_" }
    ]
  },
  {
    name: "MAP",
    id: "MAP",
    data: [
      { name: "MAP EURO", y: 23, drilldown: "MAP_" },
      { name: "MAP USA", y: 13, drilldown: "MAP_" }
    ]
  },
  {
    name: "DAP",
    id: "DAP_",
    data: [
      { name: "OCP/F/DAP/06", y: 23, drilldown: "DAP__" },
      { name: "OCP/F/DAP/09", y: 23, drilldown: "DAP__" }
    ]
  },
  {
    name: "MAP",
    id: "MAP_",
    data: [
      { name: "OCP/F/MAP/06", y: 23, drilldown: "MAP__" },
      { name: "OCP/F/MAP/09", y: 23, drilldown: "MAP__" }
    ]
  },
  {
    name: "DAP",
    id: "DAP__",
    data: [
      { name: "VESSEL1", y: 23 },
      { name: "VESSEL2", y: 23 }
    ]
  },
  {
    name: "MAP",
    id: "MAP__",
    data: [
      { name: "VESSEL1", y: 23 },
      { name: "VESSEL2", y: 23 }
    ]
  }
];

// function onChange(dates, dateStrings) {
//   console.log("From: ", dates[0], ", to: ", dates[1]);
//   console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
// }

class Quantity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seriesOptions,
      drilldownSeries
    };
    this.level = 0;
    this.chart = {};
    this.getEvent = this.getEvent.bind(this);
    this.getChart = this.getChart.bind(this);
  }

  getEvent(e) {
    if (e.type === "drilldown") {
      this.level += 1;
    } else if (e.type === "drillup" && this.level) {
      this.level -= 1;
    }
    if (this.level === seriesOptions.length) {
      this.level = 1;
    }
    if (this.level === 1) {
      this.chart.xAxis[0].update({ type: "category" });
      this.chart.xAxis[0].setTitle({
        text: "Product Category"
      });
    } else if (this.level === 2) {
      this.chart.xAxis[0].setTitle({
        text: "Product Name"
      });
    } else if (this.level === 3) {
      this.chart.xAxis[0].setTitle({
        text: "Vessel Name"
      });
    } else if (this.level === 0) {
      this.chart.xAxis[0].update({ type: "datetime" });
      this.chart.xAxis[0].setTitle({ text: "Date" });
    }
  }

  getChart(chart) {
    this.chart = chart;
  }

  render() {
    return (
      <Card bordered={false}>
        <p className="charts-title">
          Quantity
          {/* <RangePicker
            size="small"
            className="date-picker"
            allowClear={true}
            autoFocus={true}
            ranges={{
              Today: [moment(), moment()],
              "This Week": [moment().startOf("week"), moment().endOf("week")],
              "This Month": [
                moment().startOf("month"),
                moment().endOf("month")
              ],
              "This Year": [moment().startOf("year"), moment().endOf("year")]
            }}
            onChange={onChange}
          /> */}
        </p>

        <br />
        <QuantityChart
          seriesOptions={this.state.seriesOptions}
          drilldownSeries={this.state.drilldownSeries}
          getEvent={this.getEvent}
          getChart={this.getChart}
        />
      </Card>
    );
  }
}

export default Quantity;
