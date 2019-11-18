import React, { Component } from "react";
import { Card, DatePicker } from "antd";
import moment from "moment";
import QuantityChart from "./QuantityChart";

const { RangePicker } = DatePicker;

var seriesOptions = [
  {
    name: "DAP",
    color: "#F17E5D",
    data: [
      [Date.UTC(2019, 8, 1), 77],
      [Date.UTC(2019, 9, 1), 88],
      [Date.UTC(2019, 10, 1), 30]
    ]
  },
  {
    name: "MAP",
    color: "#FCC468",
    data: [
      [Date.UTC(2019, 8, 1), 12],
      [Date.UTC(2019, 9, 1), 90],
      [Date.UTC(2019, 10, 1), 9]
    ]
  },
  {
    name: "TSP",
    color: "#6BD098",
    data: [
      [Date.UTC(2019, 8, 1), 20],
      [Date.UTC(2019, 9, 1), 100],
      [Date.UTC(2019, 10, 1), 120]
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
        <QuantityChart seriesOptions={this.state.seriesOptions} />
      </Card>
    );
  }
}

export default Quantity;
