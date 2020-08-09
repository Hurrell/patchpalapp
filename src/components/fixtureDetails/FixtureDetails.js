import React from "react";
import "./FixtureDetails.css";

import FixtureKeyDetails from "./FixtureKeyDetails";
import IconCalloutTop from "./IconCalloutTop";
import IconCalloutBottom from "./IconCalloutBottom";

const DEFAULTPFDISCHARGE = 0.96;
const DEFAULTPFLED = 0.96;
const DEFAULTPFLEDSTROBE = 0.96;

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
      <article
        className="fixture-details"
        // style={{
        //   backgroundImage: `url(images/${this.props.fixture.id}_large.png)`,
        // }}
      >
        <IconCalloutTop fixture={this.props.fixture} />
        <FixtureKeyDetails fixture={this.props.fixture} />
        <IconCalloutBottom fixture={this.props.fixture} />
        <div className="detail-table">
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
      </article>
    );
  }
}

export default FixtureDetails;
