import React from "react";
import { ReactComponent as DMX5Male } from "../assets/dmx5_male.svg";
import { ReactComponent as DMX5Female } from "../assets/dmx5_female.svg";
import { ReactComponent as DMX3Male } from "../assets/dmx3_male.svg";
import { ReactComponent as DMX3Female } from "../assets/dmx3_female.svg";
import { ReactComponent as Ethercon } from "../assets/ethercon.svg";
import { powersFrom } from "../tools.js";
import { VOLTAGE } from "./review.js";
import { IoIosSwap, IoMdUmbrella, IoIosWifi, IoMdPower } from "react-icons/io";

const DEFAULTPFDISCHARGE = 0.96;
const DEFAULTPFLED = 0.96;
const DEFAULTPFLEDSTROBE = 0.96;

class FixtureKeyDetails extends React.Component {
  //container within Review, shows totals
  render() {
    let fixture = this.props.fixture;
    let current;
    let realPower = powersFrom(fixture).realPower;
    let apparentPower = powersFrom(fixture).apparentPower;
    let realPowerEstimated = powersFrom(fixture).realPowerEstimated;
    let apparentPowerEstimated = powersFrom(fixture).apparentPowerEstimated;
    //set apparent power based on avail data or defaults
    // if (fixture.apparentPower) {
    //   apparentPower = fixture.apparentPower;
    // } else if (fixture.realPower && fixture.powerFactor) {
    //   apparentPower = fixture.realPower / fixture.powerFactor;
    // } else if (fixture.realPower) {
    //   switch (fixture.lampType) {
    //     case "LED":
    //       apparentPower = fixture.realPower / DEFAULTPFLED;
    //       apparentPowerEstimated = true;
    //       break;
    //     case "Discharge":
    //       apparentPower = fixture.realPower / DEFAULTPFDISCHARGE;
    //       apparentPowerEstimated = true;
    //       break;
    //     case "Conventional":
    //       apparentPower = fixture.realPower;
    //       break;
    //     case "LED-Strobe":
    //       apparentPower = fixture.realPower / DEFAULTPFLEDSTROBE;
    //       apparentPowerEstimated = true;
    //       break;
    //     default:
    //       apparentPower = fixture.realPower;
    //       apparentPowerEstimated = true;
    //   }
    // }

    // if (fixture.realPower) {
    //   realPower = fixture.realPower;
    // } else if (fixture.apparentPower && fixture.powerFactor) {
    //   apparentPower = fixture.apparentPower * fixture.powerFactor;
    // } else if (fixture.apparentPower) {
    //   realPower = fixture.apparentPower;
    //   realPowerEstimated = true;
    // }

    //set current
    if (apparentPower) {
      current = apparentPower / VOLTAGE;
    }

    let estimate = "";
    if (apparentPowerEstimated) {
      estimate = "(est)";
    }

    return (
      <div className="totals">
        <div className="review-power">
          <span className="review-total">{Math.ceil(apparentPower)}</span>
          <span className="review-unit">VA</span>
        </div>
        <div className="review-weight">
          <span className="review-total">{Math.ceil(fixture.weight)}</span>
          <span className="review-unit">kg</span>
        </div>
        <div className="review-amps">
          <span className="review-total ">{current.toFixed(1)}</span>
          <span className="review-unit">
            A<sup>({VOLTAGE}V)</sup>
          </span>
        </div>
      </div>
    );
  }
}

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

    let realPowerHeader;
    let realPower;
    if (this.props.fixture.realPower) {
      realPowerHeader = <div>Real Power:</div>;
      realPower = <div>{"" + this.props.fixture.realPower + "W"}</div>;
    }

    let apparentPowerHeader;
    let apparentPower;
    if (this.props.fixture.apparentPower) {
      apparentPowerHeader = <div>Apparent Power:</div>;
      apparentPower = <div>{"" + this.props.fixture.apparentPower + "VA"}</div>;
    }

    let powerFactor;
    let powerFactorHeader;
    if (this.props.fixture.powerFactor) {
      powerFactorHeader = <div>Power Factor:</div>;
      powerFactor = <div>{"" + this.props.fixture.powerFactor}</div>;
    } else {
      switch (this.props.fixture.lampType) {
        case "LED":
          powerFactor = <div>{"" + DEFAULTPFLED}</div>;
          powerFactorHeader = <div>Power Factor (est):</div>;
          break;
        case "Discharge":
          powerFactor = <div>{"" + DEFAULTPFDISCHARGE}</div>;
          powerFactorHeader = <div>Power Factor (est):</div>;

          break;
        case "Conventional":
          powerFactor = <div>1</div>;
          powerFactorHeader = <div>Power Factor:</div>;
          break;
        case "LED-Strobe":
          powerFactor = <div>{"" + DEFAULTPFLEDSTROBE}</div>;
          powerFactorHeader = <div>Power Factor (est):</div>;

          break;
        default:
          powerFactor = <div>1</div>;
          powerFactorHeader = <div>Power Factor (est):</div>;
      }
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

    let powerDetails = [];
    if (this.props.fixture.realPower) {
      let realPower = "" + this.props.fixture.realPower + "W";
      powerDetails.push(<div>Real Power:</div>);
      powerDetails.push(<div>{realPower}</div>);
    }

    //   <div>Power Factor:</div>
    //   <div>{powerFactor}</div>
    //   <div>Apparent Power:</div>
    //   <div>{apparentPower}</div>

    //give totals a single fixture
    let singleFixture = {};
    Object.assign(singleFixture, this.props.fixture);
    singleFixture.quantity = 1;
    return (
      <article className="fixture-details">
        <IconCalloutTop fixture={this.props.fixture} />
        <FixtureKeyDetails fixture={this.props.fixture} />
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
          {realPowerHeader}
          {realPower}
          {powerFactorHeader}
          {powerFactor}
          {apparentPowerHeader}
          {apparentPower}
          <div>Documents:</div>
          <div>{docs}</div>
        </div>
        {/* <div>Modes: {this.props.fixture.modes}</div> */}
        {/* <div>Rented by: {this.props.fixture.productionCos}</div> */}
      </article>
    );
  }
}

export default FixtureDetails;
