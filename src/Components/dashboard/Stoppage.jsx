import React, { Component } from "react";
import { Col, Card, Icon, Menu, Dropdown } from "antd";

import PieStoppageChart from "./PieStoppageChart";
import AreaStoppageChart from "./AreaStoppageChart";
import moment from "moment";
import Axios from "axios";
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

// var summarydata = {
//   halt: {
//     total_minutes: "593.03",
//     "Attente OCP pour début chargement": "477.057",
//     "Arrêt OCP": "115.973"
//   },
//   incident: {
//     total_minutes: "179.047",
//     Motte: "17.528",
//     "Débris de Caoutchouc / Corps étranger": "17.866",
//     Temperature: "69.87",
//     Humidity: "23.056",
//     "Couleur du produit": "35.853"
//   },
//   weather: {
//     total_minutes: "899.652",
//     Pluie: "827.415",
//     "Mauvais temps": "72.237"
//   }
// };

const getColor = key => {
  switch (key) {
    case "incident":
      return "#FBC658";
    case "halt":
      return "#EF8157";
    case "weather":
      return "#51CBCE";
    default:
      return "#51CBCE";
  }
};

// var pieData = [];
// Object.keys(summarydata).forEach(key => {
//   let minutes = parseFloat(summarydata[key].total_minutes);
//   pieData.push({
//     name: key,
//     y: moment.duration({ minutes: minutes }).asHours(),
//     drilldown: key,
//     color: getColor(key)
//   });
// });

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

var AreaSeries = [
  {
    name: "Halt",
    color: "#FBC658",
    data: [
      [Date.UTC(2019, 8, 1), 77],
      [Date.UTC(2019, 9, 1), 88],
      [Date.UTC(2019, 10, 1), 30]
    ]
  },
  {
    name: "Incident Quality",
    color: "#EF8157",
    data: [
      [Date.UTC(2019, 8, 1), 12],
      [Date.UTC(2019, 9, 1), 90],
      [Date.UTC(2019, 10, 1), 9]
    ]
  },
  {
    name: "Weather",
    color: "#51CBCE",
    data: [
      [Date.UTC(2019, 8, 1), 20],
      [Date.UTC(2019, 9, 1), 100],
      [Date.UTC(2019, 10, 1), 120]
    ]
  }
];

var AreaHaltSeries = [
  {
    name: "OCP Stop",
    data: [
      [Date.UTC(2019, 8, 1), 12],
      [Date.UTC(2019, 9, 1), 37],
      [Date.UTC(2019, 10, 1), 29]
    ]
  },
  {
    name: "Wait for Loading",
    data: [
      [Date.UTC(2019, 8, 1), 10],
      [Date.UTC(2019, 9, 1), 67],
      [Date.UTC(2019, 10, 1), 37]
    ]
  },
  {
    name: "Intermediate Draft survey",
    data: [
      [Date.UTC(2019, 8, 1), 20],
      [Date.UTC(2019, 9, 1), 100],
      [Date.UTC(2019, 10, 1), 120]
    ]
  }
];

var AreaIncidentSeries = [
  {
    name: "Product Colour",
    data: [
      [Date.UTC(2019, 8, 1), 12],
      [Date.UTC(2019, 9, 1), 37],
      [Date.UTC(2019, 10, 1), 29]
    ]
  },
  {
    name: "Precense of Clods",
    data: [
      [Date.UTC(2019, 8, 1), 10],
      [Date.UTC(2019, 9, 1), 67],
      [Date.UTC(2019, 10, 1), 37]
    ]
  },
  {
    name: "High product Temperature",
    data: [
      [Date.UTC(2019, 8, 1), 20],
      [Date.UTC(2019, 9, 1), 100],
      [Date.UTC(2019, 10, 1), 120]
    ]
  },
  {
    name: "Contamination by other product",
    data: [
      [Date.UTC(2019, 8, 1), 20],
      [Date.UTC(2019, 9, 1), 100],
      [Date.UTC(2019, 10, 1), 120]
    ]
  }
];

var AreaWeatherSeries = [
  {
    name: "High Dust Rate",
    data: [
      [Date.UTC(2019, 8, 1), 12],
      [Date.UTC(2019, 9, 1), 37],
      [Date.UTC(2019, 10, 1), 29]
    ]
  },
  {
    name: "High Humidity",
    data: [
      [Date.UTC(2019, 8, 1), 10],
      [Date.UTC(2019, 9, 1), 67],
      [Date.UTC(2019, 10, 1), 37]
    ]
  },
  {
    name: "Rain/Bad Weather",
    data: [
      [Date.UTC(2019, 8, 1), 20],
      [Date.UTC(2019, 9, 1), 100],
      [Date.UTC(2019, 10, 1), 120]
    ]
  }
];

// const getEventsData = data => {
//   let ret = [];
//   data.forEach(item => {
//     ret.push([Date.parse(item.day), parseFloat(item.duration)]);
//   });
//   return ret;
// };

// var AreaSeries = [];
// Object.keys(eventsData).forEach(key => {
//   AreaSeries.push({ name: key, data: getEventsData(eventsData[key]) });
// });

class Stoppage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seriesOptions: AreaSeries,
      pieSeries: [],
      drilldownSeries: [],
      rangeSelected: "Week"
    };
    this.chart = {};
    this.lastSeries = AreaSeries;
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
    let request = `${api}incidentpiechart/?start_date=${this.getRange()}&end_date=${moment().format(
      "YYYY-MM-DD"
    )}`;
    Axios.get(request)
      .then(response => {
        let res = response.data;
        let pieData = [];
        let drilldownSeries = [];
        let pieSeries = [];
        Object.keys(res).forEach(key => {
          let seconds = parseFloat(res[key].total_seconds);
          pieData.push({
            name: key,
            y: moment.duration({ seconds: seconds }).asHours(),
            drilldown: key,
            color: getColor(key)
          });
        });
        pieSeries.push({
          name: "stoppage",
          data: pieData
        });
        Object.keys(res).forEach(key => {
          drilldownSeries.push({
            name: key,
            id: key,
            data: getData(res[key])
          });
        });
        this.setState({ pieSeries, drilldownSeries });
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
    // this.chart.hideLoading();
    this.lastSeries = series;
  }

  getEvent(e) {
    console.log(e.seriesOptions.name);
    if (e.type === "drilldown" && e.seriesOptions.name === "halt") {
      //   this.setState({
      //     seriesOptions: AreaHaltSeries
      //   });
      //   AreaHaltSeries.forEach((serie, index) => {
      //     this.chart.series[index].update(
      //       { name: serie.name, data: serie.data },
      //       true
      //     );
      //   });
      //   this.chart.redraw();
      this.updateChart(AreaHaltSeries);
    } else if (e.type === "drilldown" && e.seriesOptions.name === "incident") {
      this.updateChart(AreaIncidentSeries);
    } else if (e.type === "drilldown" && e.seriesOptions.name === "weather") {
      this.updateChart(AreaWeatherSeries);
    } else if (e.type === "drillup") {
      //   setTimeout(() => {
      //     this.setState({
      //       seriesOptions: AreaSeries
      //     });
      //   }, 100);
      //   AreaSeries.forEach((serie, index) => {
      //     this.chart.series[index].update(
      //       { name: serie.name, data: serie.data },
      //       true
      //     );
      //     this.chart.redraw();
      //   });
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
        defaultSelectedKeys={["0"]}
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
        <Col span={8}>
          <Card bordered={false}>
            <p className="charts-title">Stoppage Summary</p>
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
        <Col span={16}>
          <Card bordered={false}>
            <p className="charts-title">Stoppage Historical</p>
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
