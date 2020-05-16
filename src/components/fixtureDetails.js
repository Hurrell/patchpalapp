import React from "react";
import { ReactComponent as DMX5Male } from "../assets/dmx5_male.svg";
import { ReactComponent as DMX5Female } from "../assets/dmx5_female.svg";
import { ReactComponent as DMX3Male } from "../assets/dmx3_male.svg";
import { ReactComponent as DMX3Female } from "../assets/dmx3_female.svg";
import { ReactComponent as Ethercon } from "../assets/ethercon.svg";
import Totals from "./totals.js";
import { IoIosSwap, IoMdUmbrella, IoIosWifi, IoMdPower } from "react-icons/io";

class IconCalloutTop extends React.Component {
  render() {
    let fixture = this.props.fixture;
    let iconList = [];
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
          <IoMdPower className="details-icon true1" />
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

    return <div className="icon-callout">{iconList}</div>;
  }
}

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

class FixtureDetails extends React.Component {
  //Container within Page - shows details when fixture name clicked
  render() {
    let manual = this.props.fixture.manual ? (
      <a
        href={this.props.fixture.manual}
        target="_blank"
        rel="noopener noreferrer"
      >
        Manual
      </a>
    ) : (
      ""
    );
    let specSheet = this.props.fixture.specSheet ? (
      <a
        href={this.props.fixture.specSheet}
        target="_blank"
        rel="noopener noreferrer"
      >
        Spec Sheet
      </a>
    ) : (
      ""
    );

    let webpage = this.props.fixture.webpage ? (
      <a
        href={this.props.fixture.webpage}
        target="_blank"
        rel="noopener noreferrer"
      >
        Web Page
      </a>
    ) : (
      ""
    );

    let docs =
      manual || specSheet || webpage ? (
        <div>
          {manual} {specSheet} {webpage}
        </div>
      ) : (
        <div></div>
      );

    let power = "";
    if (this.props.fixture.realPower) {
      power += this.props.fixture.realPower + "W ";
    }
    if (this.props.fixture.apparentPower) {
      power += this.props.fixture.apparentPower + "VA ";
    }

    let protocols = "";
    if (this.props.fixture.protocols) {
      this.props.fixture.protocols.forEach((protocol) => {
        if (protocols) {
          protocols += ", ";
        }
        protocols += protocol;
      });
    }

    //give totals a single fixture
    let singleFixture = {};
    Object.assign(singleFixture, this.props.fixture);
    singleFixture.quantity = 1;
    return (
      <div className="fixture-details">
        <IconCalloutTop fixture={this.props.fixture} />
        <Totals selectedFixtures={[singleFixture]} />
        <IconCalloutBottom fixture={this.props.fixture} />
        <div class="detail-table">
          <div>Manufacturer:</div>
          <div>{this.props.fixture.manufacturer}</div>
          <div>Type:</div>
          <div>{this.props.fixture.type}</div>
          <div>Light Source:</div>
          <div>{this.props.fixture.lampType}</div>
          <div>Protocols:</div>
          <div>{protocols}</div>
          <div>Documents:</div>
          <div>{docs}</div>
        </div>
        {/* <div>Modes: {this.props.fixture.modes}</div> */}
        {/* <div>Rented by: {this.props.fixture.productionCos}</div> */}
      </div>
    );
  }
}

export default FixtureDetails;
