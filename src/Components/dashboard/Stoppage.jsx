import React, { Component } from "react";
import { Col, Card, Icon, Menu, Dropdown } from "antd";

import PieStoppageChart from "./PieStoppageChart";
import AreaStoppageChart from "./AreaStoppageChart";
import moment from "moment";

// var pieData = [
//   {
//     name: "Incident Quality",
//     y: 56,
//     drilldown: "Incident Quality",
//     color: "#FBC658"
//   },
//   { name: "Halt", y: 77, drilldown: "Halt", color: "#EF8157" },
//   { name: "Weather", y: 12, drilldown: "Weather", color: "#51CBCE" }
// ];

var summarydata = {
  halt: {
    total_minutes: "593.03",
    "Attente OCP pour début chargement": "477.057",
    "Arrêt OCP": "115.973"
  },
  incident: {
    total_minutes: "179.047",
    Motte: "17.528",
    "Débris de Caoutchouc / Corps étranger": "17.866",
    Temperature: "69.87",
    Humidity: "23.056",
    "Couleur du produit": "35.853"
  },
  weather: {
    total_minutes: "899.652",
    Pluie: "827.415",
    "Mauvais temps": "72.237"
  }
};

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

var pieData = [];
Object.keys(summarydata).forEach(key => {
  let minutes = parseFloat(summarydata[key].total_minutes);
  pieData.push({
    name: key,
    y: moment.duration({ minutes: minutes }).asHours(),
    drilldown: key,
    color: getColor(key)
  });
});

var PieSeries = [
  {
    name: "stoppage",
    data: pieData
  }
];

const getData = data => {
  let ret = [];
  let array = Object.keys(data);
  array.shift();
  array.forEach(key => {
    let minutes = parseFloat(data[key]);
    let hours = moment.duration({ minutes: minutes }).asHours();
    ret.push([key, hours]);
  });
  return ret;
};

var drilldownSeries = [];
Object.keys(summarydata).forEach(key => {
  drilldownSeries.push({
    name: key,
    id: key,
    data: getData(summarydata[key])
  });
});

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

// var eventsData = {
//   halt: [
//     {
//       day: "2019-11-15T12:29:07.492000Z",
//       duration: "115.973",
//       type: "Arrêt OCP"
//     },
//     {
//       day: "2019-11-15T13:35:30.851000Z",
//       duration: "477.057",
//       type: "Attente OCP pour début chargement"
//     }
//   ],
//   incident: [
//     {
//       day: "2019-11-15T12:54:21.567000Z",
//       duration: "23.056",
//       type: "Humidity"
//     },
//     {
//       day: "2019-11-15T12:56:21.926000Z",
//       duration: "69.87",
//       type: "Temperature"
//     },
//     {
//       day: "2019-11-15T12:59:35.564000Z",
//       duration: "17.866",
//       type: "Débris de Caoutchouc / Corps étranger"
//     },
//     {
//       day: "2019-11-15T13:05:14.076000Z",
//       duration: "14.874",
//       type: "Motte"
//     },
//     {
//       day: "2019-11-15T13:44:12.532000Z",
//       duration: "35.853",
//       type: "Couleur du produit"
//     },
//     {
//       day: "2019-11-15T14:49:29.171000Z",
//       duration: "17.528",
//       type: "Motte"
//     }
//   ],
//   weather: [
//     {
//       day: "2019-11-15T12:31:31.864000Z",
//       duration: "818.249",
//       type: "Pluie"
//     },
//     {
//       day: "2019-11-15T12:48:19.801000Z",
//       duration: "9.166",
//       type: "Pluie"
//     },
//     {
//       day: "2019-11-15T13:02:46.783000Z",
//       duration: "72.237",
//       type: "Mauvais temps"
//     }
//   ]
// };

var AreaSeries = [
  {
    name: "Halt",
    color: "#EF8157",
    data: [
      [Date.UTC(2019, 8, 1), 77],
      [Date.UTC(2019, 9, 1), 88],
      [Date.UTC(2019, 10, 1), 30]
    ]
  },
  {
    name: "Incident Quality",
    color: "#FBC658",
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
      seriesOptions: AreaSeries
    };
    this.chart = {};
    this.getEvent = this.getEvent.bind(this);
    this.getChart = this.getChart.bind(this);
    this.updateChart = this.updateChart.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  updateChart(series) {
    for (let i = 0; i < series.length; i += 1) {
      this.chart.series[0].remove();
    }
    this.chart.redraw(true);

    series.forEach(serie => {
      this.chart.addSeries(serie, false);
    });
    this.chart.redraw(true);
    // this.chart.hideLoading();
  }

  getEvent(e) {
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
    console.log(item.props.children);
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
              seriesOptions={PieSeries}
              drillDownSeries={drilldownSeries}
              getEvent={this.getEvent}
            />
          </Card>
        </Col>
        <Col span={16}>
          <Card bordered={false}>
            <p className="charts-title">Events Historical</p>
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
