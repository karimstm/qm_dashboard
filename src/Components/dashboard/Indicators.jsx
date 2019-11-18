import React, { Component } from "react";
import { Col, Card, Icon } from "antd";

const tabListEvents = [
  {
    key: "all",
    tab: "All"
  },
  {
    key: "incident",
    tab: "Incident Quality"
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

const tabListInspectors = [
  {
    key: "active",
    tab: "Active"
  },
  {
    key: "waiting",
    tab: "Waiting"
  }
];

const contentListEvents = {
  all: <p className="indicators-content">{20}</p>,
  incident: <p className="indicators-content">{20}</p>,
  halt: <p className="indicators-content">{20}</p>,
  weather: <p className="indicators-content">{20}</p>
};

const contentListInspectors = {
  active: <p className="indicators-content">{20}</p>,
  waiting: <p className="indicators-content">{20}</p>
};

export class Indicators extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsKey: "all",
      inspectorsKey: "active"
    };
  }

  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ [type]: key });
  };

  render() {
    return (
      <div>
        <Col span={6}>
          <Card
            className="indicators-card"
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
              <span className="indicators-action">
                <Icon type="sync" />
                Update Now
              </span>
            ]}
            bordered={false}
          >
            <p className="indicators-content">{20}</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            className="indicators-card"
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
            {contentListEvents[this.state.eventsKey]}
          </Card>
        </Col>
        <Col span={6}>
          <Card
            className="indicators-card"
            title={
              <span className="indicators-title">
                Inspectors
                <Icon
                  className="indicators-icon"
                  type="team"
                  theme="outlined"
                />
              </span>
            }
            bordered={false}
            tabList={tabListInspectors}
            activeTabKey={this.state.inspectorsKey}
            onTabChange={key => {
              this.onTabChange(key, "inspectorsKey");
            }}
          >
            {contentListInspectors[this.state.inspectorsKey]}
          </Card>
        </Col>
        <Col span={6}>
          <Card
            className="indicators-card"
            title={
              <span className="indicators-title">
                On holds
                <Icon
                  className="indicators-icon"
                  type="hourglass"
                  theme="twoTone"
                  twoToneColor="#ffad87"
                />
              </span>
            }
            actions={[
              <span className="indicators-action">
                <Icon type="sync" />
                Update Now
              </span>
            ]}
            bordered={false}
          >
            <p className="indicators-content">{2}</p>
          </Card>
        </Col>
      </div>
    );
  }
}

export default Indicators;
