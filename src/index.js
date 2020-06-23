import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import Footer from "./components/Footer.js";
import Header from "./components/Header.js";
import Page from "./components/Page.js";

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
          {/* Blank div for scroll into view reference */}
          <div ref={this.mainScroller}></div>
          <Page
            APPDATA={APPDATA}
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
