import React from "react";
import "./FixtureChanger.css";
import { IoIosAdd, IoIosRemove } from "react-icons/io";

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
    if (Number(quantity) && Number(quantity) < 99) {
      quantity = Number(quantity) + 1;
    } else if (Number(quantity) !== 99) {
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

export default FixtureChanger;
