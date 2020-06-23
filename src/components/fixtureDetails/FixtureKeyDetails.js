import React from "react";
import "./FixtureKeyDetails.css";

import { powersFrom } from "../../tools.js";
import { VOLTAGE } from "../review.js";

class FixtureKeyDetails extends React.Component {
  //container within Review, shows totals
  render() {
    let fixture = this.props.fixture;
    let current;
    let apparentPower = powersFrom(fixture).apparentPower;

    //set current
    if (apparentPower) {
      current = apparentPower / VOLTAGE;
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

export default FixtureKeyDetails;
