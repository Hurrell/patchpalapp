import React from "react";
import "./Page.css";

import { getObj } from "./../tools.js";
import { FixtureTable } from "./fixtureTable/FixtureTable.js";
import FixtureDetails from "./fixtureDetails/FixtureDetails.js";
import { Review } from "./Review.js";

class Page extends React.Component {
  //Container for all the content not in the header or footer
  constructor(props) {
    super(props);
    this.state = {
      projectFixtures: [],
    };
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
    quantity = parseInt(quantity);

    let updatedSelectedFixtures = this.state.projectFixtures.slice();
    let newFixture = getObj(this.props.APPDATA.fixtures, "id", fixtureId);

    if (newFixture) {
      let fixtureAlreadySelected = false;
      updatedSelectedFixtures.forEach((fixture) => {
        if (fixture.id === fixtureId) {
          fixture.quantity = quantity;
          fixtureAlreadySelected = true;
          return;
        }
      });

      if (!fixtureAlreadySelected) {
        newFixture.quantity = quantity;
        newFixture.selected = true;
        updatedSelectedFixtures.push(newFixture);
      }
    }

    this.setState({
      projectFixtures: updatedSelectedFixtures,
    });
  }

  handleRemoveButtonClick(fixtureId) {
    let remainingFixtures = this.state.projectFixtures.filter((fixture) => {
      return fixtureId !== fixture.id;
    });
    this.setState({
      projectFixtures: remainingFixtures,
    });
  }

  render() {
    let page;
    if (this.props.fixtureView) {
      page = <FixtureDetails fixture={this.props.selectedFixture} />;
    } else {
      if (this.props.mode === "build") {
        page = (
          <FixtureTable
            mode={this.props.mode}
            fixtures={this.props.APPDATA.fixtures}
            selectedFixtures={this.state.projectFixtures}
            filterText={this.props.filterText}
            onFixtureChange={this.handleFixtureChange}
            onRemoveButtonClick={this.handleRemoveButtonClick}
            onFixtureClick={this.handleFixtureClick}
          />
        );
      } else {
        page = (
          <Review
            mode={this.props.mode}
            fixtures={this.props.APPDATA.fixtures}
            selectedFixtures={this.state.projectFixtures}
            filterText={this.props.filterText}
            onFixtureChange={this.handleFixtureChange}
            onRemoveButtonClick={this.handleRemoveButtonClick}
            onFixtureClick={this.handleFixtureClick}
          />
        );
      }
    }
    return page;
  }
}

export default Page;
