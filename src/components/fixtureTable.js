import React from "react";
import { matchAgainst } from "../tools.js";
import FixtureRow from "./FixtureRow";

class FixtureTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleFixtureChange = this.handleFixtureChange.bind(this);
    this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this);
    this.handleFixtureClick = this.handleFixtureClick.bind(this);
  }

  handleFixtureChange(fixtureId, quantity) {
    this.props.onFixtureChange(fixtureId, quantity);
  }

  handleRemoveButtonClick(fixtureId) {
    this.props.onRemoveButtonClick(fixtureId);
  }

  handleFixtureClick(fixture) {
    this.props.onFixtureClick(fixture);
  }

  render() {
    const filterText = this.props.filterText;
    const rows = [];

    this.props.fixtures.forEach((fixture) => {
      //filter by search
      if (!matchAgainst(filterText, fixture)) {
        return;
      }

      //replace with selected fixture if necessary
      let fixtureSelectedOrNot = fixture;
      if (this.props.selectedFixtures) {
        this.props.selectedFixtures.forEach((selectFixture) => {
          if (selectFixture.id === fixture.id) {
            fixtureSelectedOrNot = selectFixture;
            return;
          }
        });
      }

      rows.push(
        <FixtureRow
          fixture={fixtureSelectedOrNot}
          key={fixture.id}
          onFixtureChange={this.handleFixtureChange}
          onRemoveButtonClick={this.handleRemoveButtonClick}
          onFixtureClick={this.handleFixtureClick}
        />
      );
    });

    if (rows.length === 0) {
      if (this.props.mode === "build") {
        return <div className="search-fail-text">No matches :(</div>;
      } else if (this.props.mode === "review") {
        return <div className="search-fail-text">No fixtures selected!</div>;
      } else {
        return <div></div>;
      }
    } else {
      return <ul className="fixture-table">{rows}</ul>;
    }
  }
}

export { FixtureTable };
