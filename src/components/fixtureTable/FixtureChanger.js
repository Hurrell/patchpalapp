import React from "react";
import "./FixtureChanger.css";

import { IoIosAdd, IoIosRemove } from "react-icons/io";

class FixtureChanger extends React.Component {
  //Component of FixtureRow
  //UI for fixture quantities.
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
    if (Number(quantity) && Number(quantity) < 99) {
      quantity = Number(quantity) + 1;
    } else if (Number(quantity) !== 99) {
      quantity = 1;
    }
    this.props.onFixtureChange(this.props.fixture.id, quantity);
  }

  render() {
    const fixture = this.props.fixture;

    // Show quantity and minus icon if necessary.
    let isHidden = true;
    if (fixture.quantity || fixture.quantity === 0) {
      isHidden = false;
    }

    return (
      <div className="fixture-change">
        <div onClick={this.handleMinus} className={isHidden ? "hidden" : ""}>
          <IoIosRemove className="fixture-change-icon" />
        </div>
        <form
          className={`quantity-input ${isHidden ? "hidden" : ""}`}
          onKeyPress={(e) => {
            e.key === "Enter" && e.preventDefault();
          }}
        >
          <input
            type="text"
            pattern="\d*"
            maxLength="2"
            value={fixture.quantity}
            onChange={this.handleFixtureChange}
            onKeyDown={(evt) =>
              ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
            }
          />
        </form>
        <div onClick={this.handlePlus}>
          <IoIosAdd className="fixture-change-icon" />
        </div>
      </div>
    );
  }
}

export default FixtureChanger;
