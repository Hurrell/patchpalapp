import React from "react";
import "./FixtureRow.css";

import FixtureChanger from "./FixtureChanger";
import { powersFrom } from "../../tools.js";

class FixtureRow extends React.Component {
  //Component of FixtureTable - contains fixture title, key details, and action buttons
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

    // Create readable power string.
    let power;
    if (powersFrom(fixture).apparentPower) {
      power = "" + Math.ceil(Number(powersFrom(fixture).apparentPower)) + "VA";
    }

    const addDefaultSrc = (ev) => {
      ev.target.src = "images/" + fixture.type + "_small.png";
    };

    return (
      <li className="fixture-row">
        <div className="side-img-container">
          <img
            alt=""
            className="side-img"
            src={"images/" + fixture.id + "_small.jpg"}
            onError={addDefaultSrc}
          ></img>
        </div>
        <div>
          <h3 className="fixture-row-title" onClick={this.handleFixtureClick}>
            {fixture.manufacturer} {fixture.name}
          </h3>
          <p className="fixture-in-row-details">
            {Math.ceil(fixture.weight)}kg · {power}
          </p>
        </div>
        <FixtureChanger
          onFixtureChange={this.handleFixtureChange}
          fixture={this.props.fixture}
          onRemoveButtonClick={this.handleRemoveButtonClick}
        />
      </li>
    );
  }
}

export default FixtureRow;
