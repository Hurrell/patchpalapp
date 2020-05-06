import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { printPower, getObj, matchAgainst, totalsFrom } from "./tools.js";
import {
  IoIosSearch,
  IoIosList,
  IoIosListBox,
  IoIosArrowBack,
  IoMdAddCircleOutline,
  IoMdAddCircle,
  IoMdClose,
  IoIosAdd,
  IoIosRemove,
} from "react-icons/io";

var APPDATA;
const VOLTAGE = 230;

/*Components
A) App  
    mode (search, review, fixture) -- state
    filter text --state
    projectfixtures --state
    fixture selected --state
    
    1) Footer
        mode -- props
    
    2) Header
    mode --props
    filter text --props
    fixture selected --props

    3) Fixture Table
    mode --props
    projectfixtures --props
    search text --props
    
        a) Fixture Row
            fixture --props
    
    4) Fixture Details
        fixture selected --props

*/

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

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleProdCoChange = this.handleProdCoChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  handleProdCoChange(e) {
    this.props.onProdCoChange(e.target.value);
  }

  render() {
    const filterText = this.props.filterText;

    return (
      <form
        onKeyPress={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}
      >
        <input
          autoFocus
          className="search"
          type="text"
          placeholder="Search"
          value={filterText}
          onChange={this.handleFilterTextChange}
        />
        {/* <p>
                    <select onChange={this.handleProdCoChange}>
                        <option value = "default">Filter by Production Co.</option>
                        <option value = "CSE">CSE</option>
                        <option value = "Siyan">Siyan</option>
                    </select>
                </p> */}
      </form>
    );
  }
}

class FixtureDetails extends React.Component {
  //Container within Page - shows details when fixture name clicked
  render() {
    let manual = this.props.fixture.manual ? (
      <a
        href={this.props.fixture.manual}
        target="_blank"
        rel="noopener noreferrer"
      >
        Manual
      </a>
    ) : (
      ""
    );
    let specSheet = this.props.fixture.specSheet ? (
      <a
        href={this.props.fixture.specSheet}
        target="_blank"
        rel="noopener noreferrer"
      >
        Spec Sheet
      </a>
    ) : (
      ""
    );

    let webpage = this.props.fixture.webpage ? (
      <a
        href={this.props.fixture.webpage}
        target="_blank"
        rel="noopener noreferrer"
      >
        Web Page
      </a>
    ) : (
      ""
    );

    let docs =
      manual || specSheet || webpage ? (
        <div>
          Documents: {manual} {specSheet} {webpage}
        </div>
      ) : (
        <div></div>
      );

    let power = "";
    if (this.props.fixture.realPower) {
      power += this.props.fixture.realPower + "W ";
    }
    if (this.props.fixture.apparentPower) {
      power += this.props.fixture.apparentPower + "VA ";
    }
    return (
      <div className="fixture-details">
        <div>Manufacturer: {this.props.fixture.manufacturer}</div>
        <div>Weight: {this.props.fixture.weight}kg</div>
        <div>Power: {power}</div>
        <div>Type: {this.props.fixture.type}</div>
        <div>Lamp: {this.props.fixture.lampType}</div>
        {docs}
        {/* <div>Rented by: {this.props.fixture.productionCos}</div> */}
      </div>
    );
  }
}

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
    let newFixture = getObj(APPDATA.fixtures, "id", fixtureId);

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
    let fixtureCount = 0;
    this.state.projectFixtures.forEach((fixture) => {
      fixtureCount += Number(fixture.quantity);
    });

    let page;
    if (this.props.fixtureView) {
      page = <FixtureDetails fixture={this.props.selectedFixture} />;
    } else {
      if (this.props.mode === "build") {
        page = (
          <FixtureTable
            mode={this.props.mode}
            fixtures={APPDATA.fixtures}
            selectedFixtures={this.state.projectFixtures}
            filterText={this.props.filterText}
            onFixtureChange={this.handleFixtureChange}
            onRemoveButtonClick={this.handleRemoveButtonClick}
            onFixtureClick={this.handleFixtureClick}
          />
        );
      } else {
        page = (
          <div>
            <Totals
              selectedFixtures={this.state.projectFixtures}
              name="Totals"
            />
            <div className="selected-heading">
              <h2>Selected Fixtures ({fixtureCount})</h2>
            </div>

            <FixtureTable
              mode={this.props.mode}
              fixtures={this.state.projectFixtures}
              filterText={""}
              onFixtureChange={this.handleFixtureChange}
              onRemoveButtonClick={this.handleRemoveButtonClick}
              onFixtureClick={this.handleFixtureClick}
            />
          </div>
        );
      }
    }
    return <div className="page">{page}</div>;
  }
}

class Header extends React.Component {
  //container for header - search bar, title, back button
  constructor(props) {
    super(props);
    this.state = {
      searchExtended: false,
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleClearSearch = this.handleClearSearch.bind(this);
  }

  handleFilterTextChange(text) {
    this.props.onFilterTextChange(text);
  }

  handleBackClick(e) {
    if (this.state.searchExtended) {
      this.props.onFilterTextChange("");
      this.setState({
        searchExtended: false,
      });
    } else {
      this.props.onBackClick(e);
    }
  }
  handleSearchClick(e) {
    this.setState({
      searchExtended: true,
    });
  }

  handleClearSearch(e) {
    this.props.onFilterTextChange("");
  }

  render() {
    let leftIcon;
    let rightIcon;
    let title;
    let headerClass = "header";

    switch (this.props.mode) {
      case "build":
        switch (this.state.searchExtended) {
          case true:
            title = (
              <div>
                <SearchBar
                  filterText={this.props.filterText}
                  onFilterTextChange={this.handleFilterTextChange}
                />
              </div>
            );
            leftIcon = (
              <div className="left-icon-div" onClick={this.handleBackClick}>
                <IoIosArrowBack className="left-icon" />
              </div>
            );
            headerClass = "header-search";
            rightIcon = <div></div>;
            break;
          default:
            title = (
              <h1 className="title" onClick={this.handleSearchClick}>
                PatchPal
              </h1>
            );
            leftIcon = (
              <div className="left-icon-div" onClick={this.handleSearchClick}>
                <IoIosSearch className="left-icon" />
              </div>
            );
            rightIcon = <div></div>;
            headerClass = "header";
        }
        break;
      case "review":
        title = <h1 className="title">Summary</h1>;
        leftIcon = <div></div>;
        headerClass = "header-review";
        break;
      default:
        leftIcon = <div></div>;
        rightIcon = <div></div>;
        title = <h1>PatchPal</h1>;
    }

    if (this.props.fixtureView) {
      leftIcon = (
        <div className="left-icon-div" onClick={this.handleBackClick}>
          <IoIosArrowBack className="left-icon" />
        </div>
      );
      title = <h1>{this.props.selectedFixture.name}</h1>;
      rightIcon = <div></div>;
      headerClass = "header";
    }

    return (
      <div className="header-container-container">
        <div className="header-container">
          <div className={headerClass}>
            {leftIcon}
            {title}
            {rightIcon}
          </div>
        </div>
      </div>
    );
  }
}

class Footer extends React.Component {
  //container for footer - build tab or review tab
  constructor(props) {
    super(props);
    this.handleBuildMode = this.handleBuildMode.bind(this);
  }
  handleBuildMode(e) {
    this.props.onModeChange(e);
  }
  render() {
    let reviewStyle =
      this.props.mode === "review"
        ? { fontWeight: "bold" }
        : { fontWeight: "lighter" };
    let buildStyle =
      this.props.mode === "build"
        ? { fontWeight: "bold" }
        : { fontWeight: "lighter" };
    let searchIcon =
      this.props.mode === "build" ? (
        <IoMdAddCircle className="footer-icon" />
      ) : (
        <IoMdAddCircleOutline className="footer-icon" />
      );
    let listIcon =
      this.props.mode === "review" ? (
        <IoIosListBox className="footer-icon" />
      ) : (
        <IoIosList className="footer-icon" />
      );

    return (
      <div className="footer-container-container">
        <div className="footer-container">
          <div id="footer">
            <div></div>
            <div
              className="child-clicks-this"
              style={buildStyle}
              onClick={this.handleBuildMode}
              data-mode="build"
            >
              {searchIcon}
            </div>
            <div></div>
            <div
              className="child-clicks-this"
              style={reviewStyle}
              onClick={this.handleBuildMode}
              data-mode="review"
            >
              {listIcon}
            </div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  //Container for entire app
  constructor(props) {
    super(props);
    this.state = {
      mode: "build",
      projectFixtures: [],
      filterText: "",
      selectedFixture: {},
      fixtureView: false,
    };
    this.handleFixtureClick = this.handleFixtureClick.bind(this);
    this.handleBuildMode = this.handleBuildMode.bind(this);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
  }
  handleBuildMode(e) {
    let newMode = e.target.dataset.mode;
    this.setState({
      fixtureView: false,
    });
    if (this.state.mode !== newMode) {
      this.setState({
        mode: e.target.dataset.mode,
        filterText: "",
      });
    }
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText,
    });
  }

  handleFixtureClick(fixture) {
    this.setState({
      fixtureView: true,
      selectedFixture: fixture,
    });
  }

  handleBackClick(e) {
    this.setState({
      fixtureView: false,
      selectedFixture: "",
    });
  }

  render() {
    return (
      <div className="app">
        <Header
          fixtureView={this.state.fixtureView}
          mode={this.state.mode}
          selectedFixture={this.state.selectedFixture}
          onFilterTextChange={this.handleFilterTextChange}
          onBackClick={this.handleBackClick}
        />
        <Page
          fixtureView={this.state.fixtureView}
          mode={this.state.mode}
          selectedFixture={this.state.selectedFixture}
          onFilterTextChange={this.handleFilterTextChange}
          filterText={this.state.filterText}
          onFixtureClick={this.handleFixtureClick}
        />
        <Footer mode={this.state.mode} onModeChange={this.handleBuildMode} />
      </div>
    );
  }
}

//Request json and only render page when json retreived
const xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    APPDATA = JSON.parse(this.responseText);

    ReactDOM.render(<App />, document.querySelector("#root"));
  }
};
xmlhttp.open("GET", "fixtureData.json", true);
xmlhttp.send();
