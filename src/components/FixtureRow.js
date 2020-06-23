import React from "react";
import "./FixtureRow.css";

import FixtureChanger from "./FixtureChanger";

import { IoMdClose } from "react-icons/io";
import { powersFrom } from "../tools.js";

class FixtureRow extends React.Component {
  //Component of FixtureTable - contains fixture title and action buttons
  constructor(props) {
    super(props);
    this.handleFixtureChange = this.handleFixtureChange.bind(this);
    this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this);
    this.handleFixtureClick = this.handleFixtureClick.bind(this);
  }
  handleFixtureChange(fixture, value) {
    this.props.onFixtureChange(fixture, value);
  }

  handleRemoveButtonClick() {
    this.props.onRemoveButtonClick(this.props.fixture.id);
  }

  handleFixtureClick(e) {
    this.props.onFixtureClick(this.props.fixture);
  }

  render() {
    const fixture = this.props.fixture;
    let removeButton = "";
    if (fixture.selected) {
      removeButton = (
        <button
          className="remove-button"
          type="button"
          onClick={this.handleRemoveButtonClick}
        >
          <IoMdClose className="remove-button-x" />
        </button>
      );
    }

    let power;

    if (powersFrom(fixture).apparentPower) {
      power = "" + Math.ceil(Number(powersFrom(fixture).apparentPower)) + "VA";
    }

    // if (fixture.apparentPower) {
    //   power = "" + fixture.apparentPower + "VA";
    // } else if (fixture.realPower && fixture.powerFactor) {
    //   power =
    //     Math.ceil(
    //       Number(fixture.realPower) / Number(fixture.powerFactor)
    //     ).toString() + "VA";
    // } else {
    //   power = "" + fixture.realPower + "W";
    // }

    return (
      <li className="fixture-row">
        <div className="remove-button-container">{removeButton}</div>
        <div>
          <h3>
            <span
              className="fixture-row-title"
              onClick={this.handleFixtureClick}
            >
              {fixture.manufacturer} {fixture.name}
            </span>
          </h3>

          <p className="fixture-in-row-details">
            {Math.ceil(fixture.weight)}kg · {power}
          </p>
        </div>
        <FixtureChanger
          onFixtureChange={this.handleFixtureChange}
          fixture={this.props.fixture}
        />
      </li>
    );
  }
}

export default FixtureRow;
