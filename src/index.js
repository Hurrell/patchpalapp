import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import { getObj } from "./tools.js";
import { FixtureTable } from "./components/fixtureTable.js";
import FixtureDetails from "./components/fixtureDetails.js";
import { Review } from "./components/review.js";
import Footer from "./components/Footer.js";

import { IoIosSearch, IoIosArrowBack } from "react-icons/io";

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
    this.scroller = React.createRef();
  }
  // //some code to handle scrolling...
  // componentDidMount = () => this.handleScroll();
  // //componentDidUpdate = () => this.handleScroll();
  // handleScroll = () => {
  //   const { index, selected } = this.props;
  //   if (index === selected) {
  //     this.scroller.current.scrollIntoView({ behavior: "auto" });
  //   }
  // };

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
    let page;
    if (this.props.fixtureView) {
      page = (
        <div ref={this.scroller}>
          <FixtureDetails fixture={this.props.selectedFixture} />
        </div>
      );
    } else {
      if (this.props.mode === "build") {
        page = (
          <div ref={this.scroller}>
            <FixtureTable
              mode={this.props.mode}
              fixtures={APPDATA.fixtures}
              selectedFixtures={this.state.projectFixtures}
              filterText={this.props.filterText}
              onFixtureChange={this.handleFixtureChange}
              onRemoveButtonClick={this.handleRemoveButtonClick}
              onFixtureClick={this.handleFixtureClick}
            />
          </div>
        );
      } else {
        page = (
          <div ref={this.scroller}>
            <Review
              mode={this.props.mode}
              fixtures={APPDATA.fixtures}
              selectedFixtures={this.state.projectFixtures}
              filterText={this.props.filterText}
              onFixtureChange={this.handleFixtureChange}
              onRemoveButtonClick={this.handleRemoveButtonClick}
              onFixtureClick={this.handleFixtureClick}
            />
          </div>
        );
      }
    }
    return <div>{page}</div>;
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
    if (this.state.searchExtended && !this.props.fixtureView) {
      this.props.onFilterTextChange("");
      this.setState({
        searchExtended: false,
      });
    } else if (this.state.searchExtended && this.props.fixtureView) {
      this.props.onBackClick(e);
      //this.props.handleFilterTextChange(this.props.filterText);
    } else {
      this.props.onFilterTextChange("");
      this.props.onBackClick(e);
      this.setState({
        searchExtended: false,
      });
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
    console.log(this.props.filterText);
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
      <header className="header-container-container">
        <div className="header-container">
          <div className={headerClass}>
            {leftIcon}
            {title}
            {rightIcon}
          </div>
        </div>
      </header>
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
    this.mainScroller = React.createRef();
  }

  //some code to handle scrolling...
  //componentDidMount = () => this.handleScroll();
  //componentDidUpdate = () => this.handleScroll();
  handleScroll = () => {
    const { index, selected } = this.props;
    if (index === selected) {
      this.mainScroller.current.scrollIntoView({ behavior: "auto" });
    }
  };

  handleBuildMode(e) {
    let newMode = e.target.dataset.mode;
    this.setState({
      fixtureView: false,
    });
    if (this.state.mode !== newMode) {
      this.setState({
        mode: e.target.dataset.mode,
        //filterText: "",
      });
    }
    this.handleScroll();
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText,
    });
    this.handleScroll();
  }

  handleFixtureClick(fixture) {
    this.setState({
      fixtureView: true,
      selectedFixture: fixture,
    });
    this.handleScroll();
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
          filterText={this.state.filterText}
        />
        <section className="page">
          <div ref={this.mainScroller}></div>
          <Page
            fixtureView={this.state.fixtureView}
            mode={this.state.mode}
            selectedFixture={this.state.selectedFixture}
            onFilterTextChange={this.handleFilterTextChange}
            filterText={this.state.filterText}
            onFixtureClick={this.handleFixtureClick}
          />
        </section>

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
