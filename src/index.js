import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { getObj } from "./tools.js";
import { FixtureTable } from "./components/fixtureTable.js";
import FixtureDetails from "./components/fixtureDetails.js";
import Totals from "./components/totals.js";
import {
  IoIosSearch,
  IoIosList,
  IoIosListBox,
  IoIosArrowBack,
  IoMdAddCircleOutline,
  IoMdAddCircle,
} from "react-icons/io";

var APPDATA;
//const VOLTAGE = 230;

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

function loadApp() {
  ReactDOM.render(<App />, document.querySelector("#root"));
}

//Request json and only render page when json retreived
fetch("fixtureData.json")
  .then(function (response) {
    console.log(response);
    if (!response.ok) {
      console.error("Database not found.");
    }
    return response.text();
  })
  .then(function (text) {
    APPDATA = JSON.parse(text);
    loadApp();
  });
