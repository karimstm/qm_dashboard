import React, { Component } from "react";
import { Col, Card, Icon, Menu, Dropdown } from "antd";

import PieStoppageChart from "./PieStoppageChart";
import AreaStoppageChart from "./AreaStoppageChart";
import moment from "moment";
import axios from "axios";
import { api } from "../../actions/config";

// var pieData = [
//   {
//     name: "Incident Quality",
//     y: 56,
//     drilldown: "Incident Quality",
//     color: "#EF8157"
//   },
//   { name: "Halt", y: 77, drilldown: "Halt", color: "#FBC658" },
//   { name: "Weather", y: 12, drilldown: "Weather", color: "#51CBCE" }
// ];

// var drilldownSeries = [
//   {
//     name: "Halt",
//     id: "Halt",
//     data: [
//       ["OCP Stop", 23],
//       ["Wait for Loading", 12],
//       ["Intermediate Draft survey", 42]
//     ]
//   },
//   {
//     name: "Incident Quality",
//     id: "Incident Quality",
//     data: [
//       ["Product Colour", 2],
//       ["Precense of Clods", 10],
//       ["High product Temperature", 24],
//       ["Contamination by other product", 20]
//     ]
//   },
//   {
//     name: "Weather",
//     id: "Weather",
//     data: [
//       ["High Dust Rate", 2],
//       ["High Humidity", 2],
//       ["Rain/Bad Weather", 2]
//     ]
//   }
// ];

// var AreaSeries = [
//   {
//     name: "Halt",
//     color: "#FBC658",
//     data: [
//       [Date.UTC(2019, 8, 1), 77],
//       [Date.UTC(2019, 9, 1), 88],
//       [Date.UTC(2019, 10, 1), 30]
//     ]
//   },
//   {
//     name: "Incident Quality",
//     color: "#EF8157",
//     data: [
//       [Date.UTC(2019, 8, 1), 12],
//       [Date.UTC(2019, 9, 1), 90],
//       [Date.UTC(2019, 10, 1), 9]
//     ]
//   },
//   {
//     name: "Weather",
//     color: "#51CBCE",
//     data: [
//       [Date.UTC(2019, 8, 1), 20],
//       [Date.UTC(2019, 9, 1), 100],
//       [Date.UTC(2019, 10, 1), 120]
//     ]
//   }
// ];

// var AreaHaltSeries = [
//   {
//     name: "OCP Stop",
//     data: [
//       [Date.UTC(2019, 8, 1), 12],
//       [Date.UTC(2019, 9, 1), 37],
//       [Date.UTC(2019, 10, 1), 29]
//     ]
//   },
//   {
//     name: "Wait for Loading",
//     data: [
//       [Date.UTC(2019, 8, 1), 10],
//       [Date.UTC(2019, 9, 1), 67],
//       [Date.UTC(2019, 10, 1), 37]
//     ]
//   },
//   {
//     name: "Intermediate Draft survey",
//     data: [
//       [Date.UTC(2019, 8, 1), 20],
//       [Date.UTC(2019, 9, 1), 100],
//       [Date.UTC(2019, 10, 1), 120]
//     ]
//   }
// ];

// var AreaIncidentSeries = [
//   {
//     name: "Product Colour",
//     data: [
//       [Date.UTC(2019, 8, 1), 12],
//       [Date.UTC(2019, 9, 1), 37],
//       [Date.UTC(2019, 10, 1), 29]
//     ]
//   },
//   {
//     name: "Precense of Clods",
//     data: [
//       [Date.UTC(2019, 8, 1), 10],
//       [Date.UTC(2019, 9, 1), 67],
//       [Date.UTC(2019, 10, 1), 37]
//     ]
//   },
//   {
//     name: "High product Temperature",
//     data: [
//       [Date.UTC(2019, 8, 1), 20],
//       [Date.UTC(2019, 9, 1), 100],
//       [Date.UTC(2019, 10, 1), 120]
//     ]
//   },
//   {
//     name: "Contamination by other product",
//     data: [
//       [Date.UTC(2019, 8, 1), 20],
//       [Date.UTC(2019, 9, 1), 100],
//       [Date.UTC(2019, 10, 1), 120]
//     ]
//   }
// ];

// var AreaWeatherSeries = [
//   {
//     name: "High Dust Rate",
//     data: [
//       [Date.UTC(2019, 8, 1), 12],
//       [Date.UTC(2019, 9, 1), 37],
//       [Date.UTC(2019, 10, 1), 29]
//     ]
//   },
//   {
//     name: "High Humidity",
//     data: [
//       [Date.UTC(2019, 8, 1), 10],
//       [Date.UTC(2019, 9, 1), 67],
//       [Date.UTC(2019, 10, 1), 37]
//     ]
//   },
//   {
//     name: "Rain/Bad Weather",
//     data: [
//       [Date.UTC(2019, 8, 1), 20],
//       [Date.UTC(2019, 9, 1), 100],
//       [Date.UTC(2019, 10, 1), 120]
//     ]
//   }
// ];

const capitalize = str => {
  return str.replace(/^\w/, c => c.toUpperCase());
};

const getColor = key => {
  switch (key) {
    case "Incident":
      return "#FBC658";
    case "Halt":
      return "#EF8157";
    case "Weather":
      return "#51CBCE";
    default:
      return "#51CBCE";
  }
};

const getData = data => {
  let ret = [];
  let array = Object.keys(data);
  array.shift();
  array.forEach(key => {
    let seconds = parseFloat(data[key]);
    let hours = moment.duration({ seconds: seconds }).asHours();
    ret.push([key, hours]);
  });
  return ret;
};

const getAreaData = data => {
  let ret = [];
  Object.keys(data).forEach(key => {
    data[key].forEach(dataPoint => {
      ret.push([
        Date.parse(dataPoint.date),
        moment.duration({ seconds: parseFloat(dataPoint.duration) }).asHours()
      ]);
    });
  });
  return ret;
};

const getAreaDrillDownData = rawData => {
  let drillDownData = [];
  Object.keys(rawData).forEach(key => {
    let data = [];
    rawData[key].forEach(dataPoint => {
      data.push([
        Date.parse(dataPoint.date),
        moment.duration({ seconds: parseFloat(dataPoint.duration) }).asHours()
      ]);
    });
    drillDownData.push({ name: capitalize(key), data: data });
  });
  return drillDownData;
};

class Stoppage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seriesOptions: [],
      pieSeries: [],
      AreaSeries: [],
      AreaHaltSeries: [],
      AreaIncidentSeries: [],
      AreaWeatherSeries: [],
      drilldownSeries: [],
      rangeSelected: "Month"
    };
    this.chart = {};
    this.lastSeries = this.state.AreaSeries;
    this.getEvent = this.getEvent.bind(this);
    this.getChart = this.getChart.bind(this);
    this.updateChart = this.updateChart.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.onFetchData = this.onFetchData.bind(this);
    this.getRange = this.getRange.bind(this);
  }

  getRange() {
    let range = this.state.rangeSelected;
    if (range === "Week") {
      return moment()
        .subtract(7, "days")
        .format("YYYY-MM-DD");
    } else if (range === "Month") {
      return moment()
        .subtract(1, "months")
        .format("YYYY-MM-DD");
    } else if (range === "Quarter") {
      return moment()
        .subtract(3, "months")
        .format("YYYY-MM-DD");
    } else if (range === "Year") {
      return moment()
        .subtract(12, "months")
        .format("YYYY-MM-DD");
    }
  }

  onFetchData() {
    let requestPieChart = `${api}incidentpiechart/?start_date=${this.getRange()}&end_date=${moment().format(
      "YYYY-MM-DD"
    )}`;
    let requestAreaChart = `${api}incidentchart/`;
    axios
      .all([axios.get(requestPieChart), axios.get(requestAreaChart)])
      .then(response => {
        let resPie = response[0].data;
        let resArea = response[1].data;
        let pieData = [];
        let drilldownSeries = [];
        let pieSeries = [];
        let AreaSeries = [];
        let AreaHaltSeries = [];
        let AreaIncidentSeries = [];
        let AreaWeatherSeries = [];
        Object.keys(resPie).forEach(key => {
          let seconds = parseFloat(resPie[key].total_seconds);
          pieData.push({
            name: capitalize(key),
            y: moment.duration({ seconds: seconds }).asHours(),
            drilldown: key,
            color: getColor(key)
          });
        });
        pieSeries.push({
          name: "Stoppage",
          data: pieData
        });
        Object.keys(resPie).forEach(key => {
          drilldownSeries.push({
            name: capitalize(key),
            id: key,
            data: getData(resPie[key])
          });
        });
        Object.keys(resArea).forEach(key => {
          AreaSeries.push({
            name: capitalize(key),
            data: getAreaData(resArea[key])
          });
          if (key === "halt") {
            AreaHaltSeries = getAreaDrillDownData(resArea[key]);
          } else if (key === "incident") {
            AreaIncidentSeries = getAreaDrillDownData(resArea[key]);
          } else if (key === "weather") {
            AreaWeatherSeries = getAreaDrillDownData(resArea[key]);
          }
        });
        this.lastSeries = AreaSeries;
        this.setState({
          pieSeries,
          drilldownSeries,
          seriesOptions: AreaSeries,
          AreaSeries,
          AreaHaltSeries,
          AreaIncidentSeries,
          AreaWeatherSeries
        });
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.onFetchData();
  }

  updateChart(series) {
    for (let i = 0; i < this.lastSeries.length; i += 1) {
      if (this.chart.series[0]) {
        this.chart.series[0].remove();
      }
    }
    this.chart.redraw(true);

    series.forEach(serie => {
      this.chart.addSeries(serie, false);
    });
    this.chart.redraw(true);
    this.lastSeries = series;
  }

  getEvent(e) {
    const {
      AreaHaltSeries,
      AreaIncidentSeries,
      AreaWeatherSeries,
      AreaSeries
    } = this.state;
    if (e.type === "drilldown" && e.seriesOptions.name === "Halt") {
      this.updateChart(AreaHaltSeries);
    } else if (e.type === "drilldown" && e.seriesOptions.name === "Incident") {
      this.updateChart(AreaIncidentSeries);
    } else if (e.type === "drilldown" && e.seriesOptions.name === "Weather") {
      this.updateChart(AreaWeatherSeries);
    } else if (e.type === "drillup") {
      this.updateChart(AreaSeries);
    }
  }

  getChart(chart) {
    this.chart = chart;
  }

  handleSelect(item) {
    this.setState({ rangeSelected: item.props.children }, () =>
      this.onFetchData()
    );
  }

  render() {
    const menu = (
      <Menu
        selectable={true}
        defaultSelectedKeys={["1"]}
        onSelect={item => this.handleSelect(item.item)}
      >
        <Menu.Item key="0">Week</Menu.Item>
        <Menu.Item key="1">Month</Menu.Item>
        <Menu.Item key="3">Quarter</Menu.Item>
        <Menu.Item key="4">Year</Menu.Item>
      </Menu>
    );

    return (
      <div>
        <Col xm={24} md={24} lg={8}>
          <Card bordered={false} className="stoppage">
            <p className="charts-title">Stoppages Summary</p>
            <p className="charts-subtitle">
              One&nbsp;{this.state.rangeSelected}
            </p>
            <div className="chart-setting">
              <Dropdown
                overlay={menu}
                trigger={["click"]}
                placement="bottomRight"
              >
                <Icon type="setting" theme="outlined" />
              </Dropdown>
            </div>
            <PieStoppageChart
              seriesOptions={this.state.pieSeries}
              drilldownSeries={this.state.drilldownSeries}
              getEvent={this.getEvent}
            />
          </Card>
        </Col>
        <Col xm={24} md={24} lg={16}>
          <Card bordered={false}>
            <p className="charts-title">Stoppages History</p>
            <br />
            <AreaStoppageChart
              seriesOptions={this.state.seriesOptions}
              getChart={this.getChart}
            />
          </Card>
        </Col>
      </div>
    );
  }
}

export default Stoppage;
