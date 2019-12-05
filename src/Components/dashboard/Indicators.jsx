import React, { Component } from "react";
import { Col, Card, Icon, Tag } from "antd";
import { api_key, api_weather, api } from "../../actions/config";
import Axios from "axios";
import moment from "moment";
// import EventsListPage from "../pages/EventsListPage";

const { CheckableTag } = Tag;

var interval;

const tabListEvents = [
  {
    key: "all",
    tab: "All"
  },
  {
    key: "incident",
    tab: "Quality incident"
  },
  {
    key: "halt",
    tab: "Halt"
  },
  {
    key: "weather",
    tab: "Weather"
  }
];

const weatherIcons = {
  Thunderstorm: "wi-thunderstorm",
  Drizzle: "wi-sleet",
  Rain: "wi-storm-showers",
  Snow: "wi-snow",
  Fog: "wi-fog",
  Clear: "wi-day-sunny",
  Clouds: "wi-day-fog"
};

const cities = [
  { key: "jorf", name: "JORF" },
  { key: "safi", name: "SAFI" },
  { key: "casablanca", name: "CASA" }
];

export class Indicators extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsKey: "all",
      weatherKey: "casablanca",
      city: undefined,
      country: undefined,
      temp: undefined,
      wind: undefined,
      humidity: undefined,
      desc: "",
      idIcon: undefined,
      icon: undefined,
      date: undefined,
      checked: true,
      active: false,
      onhold: null,
      ongoing: null,
      all: null,
      incident: null,
      halt: null,
      weather: null
    };
    this.getWeather = this.getWeather.bind(this);
    this.getDate = this.getDate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleInspectClick = this.handleInspectClick.bind(this);
    this.getInspections = this.getInspections.bind(this);
    this.getEvents = this.getEvents.bind(this);
  }

  handleChange = (key, checked) => {
    if (checked) {
      this.setState({ weatherKey: key, checked }, () => {
        this.getWeather();
      });
    }
  };

  getWeather = () => {
    Axios.get(
      `${api_weather}find?q=${this.state.weatherKey},ma&units=metric&appid=${api_key}`
    )
      .then(resp => {
        const list = resp.data.list[0];
        if (list) {
          this.setState(
            {
              city: list.name,
              country: list.sys.country,
              temp: Math.floor(list.main.temp),
              wind: list.wind.speed,
              humidity: list.main.humidity,
              desc: list.weather[0].description,
              idIcon: list.weather[0].id
            },
            () => {
              this.getWeatherIcon(weatherIcons, this.state.idIcon);
            }
          );
        }
      })
      .catch(err => console.log(err));
  };

  getWeatherIcon(weatherIcons, id) {
    switch (true) {
      case id >= 200 && id < 232:
        this.setState({ icon: weatherIcons.Thunderstorm });
        break;
      case id >= 300 && id <= 321:
        this.setState({ icon: weatherIcons.Drizzle });
        break;
      case id >= 500 && id <= 521:
        this.setState({ icon: weatherIcons.Rain });
        break;
      case id >= 600 && id <= 622:
        this.setState({ icon: weatherIcons.Snow });
        break;
      case id >= 701 && id <= 781:
        this.setState({ icon: weatherIcons.Fog });
        break;
      case id === 800:
        this.setState({ icon: weatherIcons.Clear });
        break;
      case id >= 801 && id <= 804:
        this.setState({ icon: weatherIcons.Clouds });
        break;
      default:
        this.setState({ icon: weatherIcons.Clouds });
    }
  }

  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  };

  getDate() {
    interval = setInterval(
      function() {
        this.setState({ date: moment(Date.now()).format("dddd, h:mm A") });
      }.bind(this),
      1000
    );
  }

  getInspections() {
    Axios.get(`${api}inspection/events/counts`)
      .then(response => {
        let data = response.data;
        let ongoing = data.INPROGRESS;
        let onhold = data.ONHOLD;
        this.setState({ onhold, ongoing, active: false });
      })
      .catch(err => console.log(err));
  }

  getEvents() {
    const requestURL = `${api}incidentdetails/?resuming_hour=null&inspection_ref__inspection_status=ONHOLD&ordering=-stopping_hour`;
    Axios.get(requestURL)
      .then(response => {
        let data = response.data;
        let incident = data.filter(item => item.related === "PRODUCT").length;
        let halt = data.filter(item => item.related === "HALT").length;
        let weather = data.filter(item => item.related === "WEATHER").length;
        let all = incident + halt + weather;
        this.setState({ incident, halt, weather, all });
      })
      .catch(err => console.log(err));
  }

  handleUpdate() {
    this.setState({ active: true }, () =>
      setTimeout(() => this.getInspections(), 1000)
    );
  }

  handleInspectClick(type) {
    if (type === "ongoing") {
      this.props.history.push("/events", { type: "INPROGRESS" });
    } else if (type === "onhold") {
      this.props.history.push("/events", { type: "ONHOLD" });
    }
  }

  handleEventClick(related, value) {
    if (value) {
      switch (related) {
        case "incident":
          this.props.history.push("/events", {
            type: "ONHOLD",
            related: "PRODUCT"
          });
          break;
        case "halt":
          this.props.history.push("/events", {
            type: "ONHOLD",
            related: "HALT"
          });
          break;
        case "weather":
          this.props.history.push("/events", {
            type: "ONHOLD",
            related: "WEATHER"
          });
          break;
        default:
          this.props.history.push("/events", { type: "ONHOLD" });
      }
    }
  }

  componentDidMount() {
    this.getWeather();
    this.getDate();
    this.getInspections();
    this.getEvents();
  }

  componentWillUnmount() {
    clearInterval(interval);
  }

  getContentListEvents() {
    return {
      all: (
        <span
          className="indicators-content all"
          onClick={() => this.handleEventClick("all", this.state.all)}
        >
          {this.state.all}
        </span>
      ),
      incident: (
        <span
          className="indicators-content incident"
          onClick={() => this.handleEventClick("incident", this.state.incident)}
        >
          {this.state.incident}
        </span>
      ),
      halt: (
        <span
          className="indicators-content halt"
          onClick={() => this.handleEventClick("halt", this.state.halt)}
        >
          {this.state.halt}
        </span>
      ),
      weather: (
        <span
          className="indicators-content weather"
          onClick={() => this.handleEventClick("weather", this.state.weather)}
        >
          {this.state.weather}
        </span>
      )
    };
  }

  render() {
    return (
      <div>
        <Col xs={24} sm={12} lg={8} xl={8}>
          <Card
            className="indicators-card inspections"
            size="default"
            title={
              <span className="indicators-title">
                Inspections
                <Icon
                  className="indicators-icon"
                  type="eye"
                  theme="twoTone"
                  twoToneColor="#52c41a"
                />
              </span>
            }
            actions={[
              <span
                className="indicators-action"
                onClick={() => this.handleUpdate()}
              >
                <Icon
                  className={this.state.active ? "active" : null}
                  type="sync"
                />
                Update Now
              </span>
            ]}
            bordered={false}
          >
            <div className="indicators-content inspections">
              <div
                className="indicators-content ongoing"
                onClick={() => this.handleInspectClick("ongoing")}
              >
                {this.state.ongoing}
                <span
                  className="indicators-subtitle"
                  style={{ color: "#52c41a" }}
                >
                  Ongoing
                  <Icon
                    className="inspections-icon"
                    type="safety-certificate"
                    theme="twoTone"
                    twoToneColor="#52c41a"
                  />
                </span>
              </div>
              <div
                className="indicators-content onhold"
                onClick={() => this.handleInspectClick("onhold")}
              >
                {this.state.onhold}
                <span
                  className="indicators-subtitle"
                  style={{ color: "#ffad87" }}
                >
                  On-hold
                  <Icon
                    className="inspections-icon"
                    type="warning"
                    theme="twoTone"
                    twoToneColor="#ffad87"
                  />
                </span>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={9} xl={9}>
          <Card
            className="indicators-card events"
            title={
              <span className="indicators-title">
                Events
                <Icon
                  className="indicators-icon"
                  type="exclamation-circle"
                  theme="twoTone"
                />
              </span>
            }
            bordered={false}
            tabList={tabListEvents}
            activeTabKey={this.state.eventsKey}
            onTabChange={key => {
              this.onTabChange(key, "eventsKey");
            }}
          >
            {this.getContentListEvents()[this.state.eventsKey]}
          </Card>
        </Col>
        <Col xs={24} sm={24} lg={7} xl={7}>
          <Card
            className="indicators-card weather"
            title={
              <div className="weather-head">
                <div className="weather-header">
                  <span className="indicators-title">
                    {this.state.city}, {this.state.country}
                  </span>
                  <span className="weather-date">{this.state.date}</span>
                </div>
                <div className="city-tag">
                  {cities.map((city, index) => {
                    return (
                      <CheckableTag
                        className="checkable-tag"
                        key={city.key}
                        checked={
                          this.state.weatherKey === city.key
                            ? this.state.checked
                            : !this.state.checked
                        }
                        onChange={checked => {
                          this.handleChange(city.key, checked);
                        }}
                      >
                        {city.name}
                      </CheckableTag>
                    );
                  })}
                </div>
              </div>
            }
            bordered={false}
          >
            <div className="weather-content">
              <span className="weather-info">
                <span>
                  <span className="temp-info">{this.state.temp}&deg;C</span>
                  <span className="weather-desc">
                    <Tag color="purple">{this.state.desc}</Tag>
                  </span>
                </span>
                <span className="wind-humid-info">
                  <i className="wi wi-strong-wind"></i>
                  {this.state.wind}&nbsp;km/h&nbsp;Winds
                  <i className="wi wi-humidity"></i>
                  {this.state.humidity}
                  %&nbsp;Humidity
                </span>
              </span>
              <span className="weather-icon">
                <i className={`wi ${this.state.icon} display-4`}></i>
              </span>
            </div>
          </Card>
        </Col>
      </div>
    );
  }
}

export default Indicators;
