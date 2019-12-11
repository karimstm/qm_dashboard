import React, { Component } from "react";
import { Card, Tag } from "antd";

const { CheckableTag } = Tag;

const ports = [
  { key: "jorf", name: "JORF", long: 33.1232, lat: -8.63, zoom: 17 },
  { key: "safi", name: "SAFI", long: 32.3144, lat: -9.2389 },
  { key: "casablanca", name: "CASA", long: 33.6039, lat: -7.5969 }
];

class MapIframe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portKey: "jorf",
      checked: true,
      lat: -8.63,
      long: 33.1232,
      zoom: 17
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (key, checked) => {
    if (checked) {
      let long;
      let lat;
      let zoom;
      if (key === "jorf") {
        long = 33.1232;
        lat = -8.63;
        zoom = 17;
      } else if (key === "safi") {
        long = 32.3081;
        lat = -9.2481;
        zoom = 17;
      } else if (key === "casablanca") {
        long = 33.6067;
        lat = -7.6042;
        zoom = 17;
      }
      this.setState({ portKey: key, checked, long, lat, zoom });
    }
  };

  render() {
    const { zoom, long, lat } = this.state;
    return (
      <div>
        <Card
          title={ports.map((port, index) => {
            return (
              <CheckableTag
                style={{ marginLeft: "10px", fontWeight: "bold" }}
                className="checkable-tag"
                key={port.key}
                checked={
                  this.state.portKey === port.key
                    ? this.state.checked
                    : !this.state.checked
                }
                onChange={checked => {
                  this.handleChange(port.key, checked);
                }}
              >
                {port.name}
              </CheckableTag>
            );
          })}
          bodyStyle={{ marginBottom: "-25px" }}
          headStyle={{ padding: "0px" }}
          style={{ marginTop: "20px", paddingBottom: "0px" }}
        >
          <iframe
            title="marinetraffic"
            name="marinetraffic"
            id="marinetraffic"
            width="100%"
            height="600"
            scrolling="no"
            frameBorder="0"
            src={`https://www.marinetraffic.com/en/ais/embed/zoom:${zoom}/centery:${long}/centerx:${lat}/maptype:4/shownames:false/mmsi:0/shipid:0/fleet:/fleet_id:/vtypes:/showmenu:/remember:false/`}
          ></iframe>
          <div className="iframe-hacked"></div>
        </Card>
      </div>
    );
  }
}

export default MapIframe;
