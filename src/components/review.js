import React from "react";
import { printPower, totalsFrom } from "../tools.js";
import { FixtureTable } from "./fixtureTable/FixtureTable.js";

const VOLTAGE = 230;

class Totals extends React.Component {
  //container within Review, shows totals

  constructor(props) {
    super(props);
    this.childDiv = React.createRef();
  }
  //Some code to reset scroll to top
  componentDidMount = () => this.handleScroll();
  //componentDidUpdate = () => this.handleScroll();
  handleScroll = () => {
    const { index, selected } = this.props;
    if (index === selected) {
      this.childDiv.current.scrollIntoView({ behavior: "auto" });
    }
  };

  render() {
    let totalObj = totalsFrom(this.props.selectedFixtures, VOLTAGE);
    return (
      <div ref={this.childDiv} className="totals">
        <div className="review-power">
          <span className="review-total">
            {printPower(totalObj.power).number}
          </span>
          <span className="review-unit">
            {printPower(totalObj.power).unit}VA
          </span>
        </div>
        <div className="review-weight">
          <span className="review-total">{Math.ceil(totalObj.weight)}</span>
          <span className="review-unit">kg</span>
        </div>
        <div className="review-amps">
          <span className="review-total ">{Math.ceil(totalObj.current)}</span>
          <span className="review-unit">
            A<sup>({VOLTAGE}V)</sup>
          </span>
        </div>
      </div>
    );
  }
}

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.handleFixtureChange = this.handleFixtureChange.bind(this);
    this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleFixtureClick = this.handleFixtureClick.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.props.onFilterTextChange(filterText);
  }

  handleFixtureClick(fixture) {
    this.props.onFixtureClick(fixture);
  }

  handleFixtureChange(fixtureId, quantity) {
    this.props.onFixtureChange(fixtureId, quantity);
  }

  handleRemoveButtonClick(fixtureId) {
    this.props.onRemoveButtonClick(fixtureId);
  }

  render() {
    let fixtureCount = 0;
    this.props.selectedFixtures.forEach((fixture) => {
      if (Number(fixture.quantity)) {
        fixtureCount += Number(fixture.quantity);
      }
    });
    return (
      <div>
        <Totals selectedFixtures={this.props.selectedFixtures} name="Totals" />
        <div className="selected-heading">
          <h2>Selected Fixtures ({fixtureCount})</h2>
        </div>

        <FixtureTable
          mode={this.props.mode}
          fixtures={this.props.selectedFixtures}
          filterText={""}
          onFixtureChange={this.handleFixtureChange}
          onRemoveButtonClick={this.handleRemoveButtonClick}
          onFixtureClick={this.handleFixtureClick}
        />
      </div>
    );
  }
}
export { Review, Totals, VOLTAGE };
