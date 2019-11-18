import React, { Component } from "react";
import { Card, DatePicker } from "antd";
import moment from "moment";
import QuantityChart from "./QuantityChart";

const { RangePicker } = DatePicker;

var seriesOptions = [
  {
    name: "DAP",
    data: [
      [Date.UTC(2019, 4, 1), 33],
      [Date.UTC(2019, 5, 1), 18],
      [Date.UTC(2019, 6, 1), 12],
      [Date.UTC(2019, 7, 1), 77],
      [Date.UTC(2019, 8, 1), 88],
      [Date.UTC(2019, 9, 1), 30],
      [Date.UTC(2019, 10, 1), 90],
      [Date.UTC(2019, 11, 1), 9]
    ],
    drilldown: "DAP",
    color: "#F17E5D"
  },
  {
    name: "MAP",
    drilldown: "MAP",
    color: "#FCC468",
    data: [
      [Date.UTC(2019, 4, 1), 12],
      [Date.UTC(2019, 5, 1), 30],
      [Date.UTC(2019, 6, 1), 11],
      [Date.UTC(2019, 7, 1), 12],
      [Date.UTC(2019, 8, 1), 90],
      [Date.UTC(2019, 9, 1), 90],
      [Date.UTC(2019, 10, 1), 90],
      [Date.UTC(2019, 11, 1), 9]
    ]
  },
  {
    name: "TSP",
    drilldown: "TSP",
    color: "#6BD098",
    data: [
      [Date.UTC(2019, 4, 1), 12],
      [Date.UTC(2019, 5, 1), 10],
      [Date.UTC(2019, 6, 1), 22],
      [Date.UTC(2019, 7, 1), 20],
      [Date.UTC(2019, 8, 1), 100],
      [Date.UTC(2019, 9, 1), 100],
      [Date.UTC(2019, 10, 1), 100],
      [Date.UTC(2019, 11, 1), 120]
    ]
  },
  {
    name: "NPK",
    drilldown: "NPK",
    color: "#81F0E5",
    data: [
      [Date.UTC(2019, 4, 1), 12],
      [Date.UTC(2019, 5, 1), 12],
      [Date.UTC(2019, 6, 1), 12],
      [Date.UTC(2019, 7, 1), 77],
      [Date.UTC(2019, 8, 1), 88],
      [Date.UTC(2019, 9, 1), 88],
      [Date.UTC(2019, 10, 1), 88],
      [Date.UTC(2019, 11, 1), 30]
    ]
  },
  {
    name: "ASP",
    drilldown: "ASP",
    color: "#fb8e95",
    data: [
      [Date.UTC(2019, 4, 1), 12],
      [Date.UTC(2019, 5, 1), 12],
      [Date.UTC(2019, 6, 1), 12],
      [Date.UTC(2019, 7, 1), 77],
      [Date.UTC(2019, 8, 1), 88],
      [Date.UTC(2019, 9, 1), 30],
      [Date.UTC(2019, 10, 1), 90],
      [Date.UTC(2019, 11, 1), 9]
    ]
  },
  {
    name: "NPS",
    drilldown: "NPS",
    color: "#b0e5ff",
    data: [
      [Date.UTC(2019, 4, 1), 12],
      [Date.UTC(2019, 5, 1), 12],
      [Date.UTC(2019, 6, 1), 12],
      [Date.UTC(2019, 7, 1), 77],
      [Date.UTC(2019, 8, 1), 88],
      [Date.UTC(2019, 9, 1), 30],
      [Date.UTC(2019, 10, 1), 90],
      [Date.UTC(2019, 11, 1), 9]
    ]
  }
];

var drilldownSeries = [
  {
    name: "DAP",
    id: "DAP",
    data: [
      ["DAPI", 23],
      ["DAPII", 13]
    ]
  },
  {
    name: "MAP",
    id: "MAP",
    data: [
      ["MAPI", 23],
      ["MAPII", 13]
    ]
  },
  {
    name: "TSP",
    id: "TSP",
    data: [
      ["TSPI", 23],
      ["TSPII", 13]
    ]
  },
  {
    name: "NPK",
    id: "NPK",
    data: [
      ["NPKI", 23],
      ["NPKII", 13]
    ]
  },
  {
    name: "ASP",
    id: "ASP",
    data: [
      ["ASPI", 23],
      ["ASPII", 13]
    ]
  },
  {
    name: "NPS",
    id: "NPS",
    data: [
      ["NSPI", 23],
      ["NSPII", 13]
    ]
  }
];

function onChange(dates, dateStrings) {
  console.log("From: ", dates[0], ", to: ", dates[1]);
  console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
}

class Quantity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seriesOptions
    };
  }
  render() {
    return (
      <Card bordered={false}>
        <p className="charts-title">
          Quantity
          <RangePicker
            size="small"
            className="date-picker"
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
          />
        </p>

        <br />
        <QuantityChart
          seriesOptions={this.state.seriesOptions}
          drilldownSeries={drilldownSeries}
        />
      </Card>
    );
  }
}

export default Quantity;
