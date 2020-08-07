import React from "react";
import "./IconCalloutTop.css";

import { IoIosSwap, IoMdUmbrella, IoIosWifi, IoMdPower } from "react-icons/io";

class IconCalloutTop extends React.Component {
  render() {
    let fixture = this.props.fixture;
    let iconList = [];

    if (fixture.powerIn === "TRUE1") {
      iconList.push(
        <div className="details-bottom-tile">
          <IoMdPower className="details-icon true1" />
          <div>TRUE1</div>
        </div>
      );
    } else if (fixture.powerIn === "PowerCon") {
      iconList.push(
        <div className="details-bottom-tile">
          <IoMdPower className="details-icon powercon" />
          <div>PCon</div>
        </div>
      );
    }

    if (fixture.powerOut === "TRUE1") {
      iconList.push(
        <div className="details-bottom-tile">
          <IoMdPower className="details-icon" />
          <div>TRUE1</div>
        </div>
      );
    } else if (fixture.powerOut === "PowerCon") {
      iconList.push(
        <div className="details-bottom-tile">
          <IoMdPower className="details-icon" />
          <div>PCon</div>
        </div>
      );
    }

    if (fixture.RDM) {
      iconList.push(
        <div className="details-top-tile">
          <IoIosSwap className="details-icon" />
          <div>RDM</div>
        </div>
      );
    }

    if (fixture.IP) {
      iconList.push(
        <div className="details-top-tile">
          <IoMdUmbrella className="details-icon" />
          <div>IP{fixture.IP}</div>
        </div>
      );
    }

    if (fixture.wireless) {
      iconList.push(
        <div className="details-bottom-tile">
          <IoIosWifi className="details-icon" />
          <div>{fixture.wireless === "Optional" ? "(Option)" : "Wireless"}</div>
        </div>
      );
    }

    return <div className="icon-callout">{iconList}</div>;
  }
}

export default IconCalloutTop;
