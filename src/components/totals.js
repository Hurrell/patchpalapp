import React from "react";
import { printPower, totalsFrom } from "../tools.js";

const VOLTAGE = 230;

class Totals extends React.Component {
  //container within Review, shows totals
  render() {
    let totalObj = totalsFrom(this.props.selectedFixtures, VOLTAGE);
    return (
      <div className="totals">
        <div className="review-power">
          <span className="review-total">
            {printPower(totalObj.power).number}
          </span>
          <span className="review-unit">{printPower(totalObj.power).unit}</span>
        </div>
        <div className="review-weight">
          <span className="review-total">{Math.ceil(totalObj.weight)}</span>
          <span className="review-unit">kg</span>
        </div>
        <div className="review-amps">
          <span className="review-total ">{Math.ceil(totalObj.current)}</span>
          <span className="review-unit">
            A<sup>({VOLTAGE}v)</sup>
          </span>
        </div>
      </div>
    );
  }
}
export default Totals;
