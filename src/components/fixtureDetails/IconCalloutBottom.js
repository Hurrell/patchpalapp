import React from "react";
import "./IconCalloutBottom.css";

import { ReactComponent as DMX5Male } from "../../assets/dmx5_male.svg";
import { ReactComponent as DMX5Female } from "../../assets/dmx5_female.svg";
import { ReactComponent as DMX3Male } from "../../assets/dmx3_male.svg";
import { ReactComponent as DMX3Female } from "../../assets/dmx3_female.svg";
import { ReactComponent as Ethercon } from "../../assets/ethercon.svg";

class IconCalloutBottom extends React.Component {
  render() {
    let fixture = this.props.fixture;
    let iconList = [];
    if (fixture.DMX5in) {
      iconList.push(
        <div className="details-bottom-tile">
          <DMX5Male className="details-icon smaller-connector" />
          <div>5-pin in</div>
        </div>
      );
    }
    if (fixture.DMX5out) {
      iconList.push(
        <div className="details-bottom-tile">
          <DMX5Female className="details-icon" />
          <div>5-pin out</div>
        </div>
      );
    }
    if (fixture.DMX3in) {
      iconList.push(
        <div className="details-bottom-tile">
          <DMX3Male className="details-icon  smaller-connector" />
          <div>3-pin in</div>
        </div>
      );
    }
    if (fixture.DMX3out) {
      iconList.push(
        <div className="details-bottom-tile">
          <DMX3Female className="details-icon" />
          <div>3-pin out</div>
        </div>
      );
    }
    if (fixture.ethernetIn) {
      iconList.push(
        <div className="details-bottom-tile">
          <Ethercon className="details-icon" />
          <div>EtherCon</div>
        </div>
      );
    }
    if (fixture.ethernetOut) {
      iconList.push(
        <div className="details-bottom-tile">
          <Ethercon className="details-icon" />
          <div>EtherCon</div>
        </div>
      );
    }
    return <div className="icon-callout">{iconList}</div>;
  }
}

export default IconCalloutBottom;
