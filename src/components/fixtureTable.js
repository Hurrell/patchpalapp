import React from "react";
import { IoMdClose, IoIosAdd, IoIosRemove } from "react-icons/io";
import { matchAgainst } from "../tools.js";

class FixtureChanger extends React.Component {
  //Component of FixtureRow - user inputs fixture quantities here
  constructor(props) {
    super(props);
    this.handleFixtureChange = this.handleFixtureChange.bind(this);
    this.handleMinus = this.handleMinus.bind(this);
    this.handlePlus = this.handlePlus.bind(this);
  }
  handleFixtureChange(e) {
    this.props.onFixtureChange(this.props.fixture.id, e.target.value);
  }
  handleMinus() {
    let quantity =
      this.props.fixture.quantity > 0 ? (this.props.fixture.quantity -= 1) : 0;
    this.props.onFixtureChange(this.props.fixture.id, quantity);
  }
  handlePlus() {
    let quantity = this.props.fixture.quantity;
    if (Number(quantity)) {
      quantity = Number(quantity) + 1;
    } else {
      quantity = 1;
    }
    this.props.onFixtureChange(this.props.fixture.id, quantity);
  }

  render() {
    const fixture = this.props.fixture;
    let quantityShown = "";
    let minusSymbol = <div></div>;
    let numberInput = <div></div>;
    if (fixture.quantity || fixture.quantity === 0) {
      quantityShown = fixture.quantity;
      minusSymbol = (
        <div onClick={this.handleMinus}>
          <IoIosRemove className="plus-minus-icon" />
        </div>
      );
      numberInput = (
        <form
          className="quantity-input"
          onKeyPress={(e) => {
            e.key === "Enter" && e.preventDefault();
          }}
        >
          <input
            type="text"
            pattern="\d*"
            maxLength="2"
            value={quantityShown}
            onChange={this.handleFixtureChange}
            onKeyDown={(evt) =>
              ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
            }
          />
        </form>
      );
    }
    return (
      <div className="fixture-change">
        {minusSymbol}
        {numberInput}
        <div onClick={this.handlePlus}>
          <IoIosAdd className="plus-minus-icon" />
        </div>
      </div>
    );
  }
}

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
    if (fixture.apparentPower) {
      power = "" + fixture.apparentPower + "VA";
    } else if (fixture.realPower && fixture.powerFactor) {
      power =
        Math.ceil(
          Number(fixture.realPower) / Number(fixture.powerFactor)
        ).toString() + "VA";
    } else {
      power = "" + fixture.realPower + "W";
    }

    return (
      <div className="fixture-row">
        <div className="remove-button-container">{removeButton}</div>
        <div>
          <div>
            <span
              className="fixture-row-title"
              onClick={this.handleFixtureClick}
            >
              {fixture.manufacturer} {fixture.name}
            </span>
          </div>
          <div className="fixture-in-row-details">
            {power} · {fixture.weight}kg
          </div>
        </div>
        <FixtureChanger
          onFixtureChange={this.handleFixtureChange}
          fixture={this.props.fixture}
        />
      </div>
    );
  }
}

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
      return <div className="fixture-table">{rows}</div>;
    }
  }
}

export { FixtureTable, FixtureRow, FixtureChanger };
