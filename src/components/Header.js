import React from "react";
import "./Header.css";
import SearchBar from "./SearchBar.js";

import { IoIosSearch, IoIosArrowBack } from "react-icons/io";

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
    let title;

    switch (this.props.mode) {
      case "build":
        switch (this.state.searchExtended) {
          case true:
            title = (
              <SearchBar
                filterText={this.props.filterText}
                onFilterTextChange={this.handleFilterTextChange}
              />
            );
            leftIcon = (
              <div className="left-icon-div" onClick={this.handleBackClick}>
                <IoIosArrowBack className="left-icon" />
              </div>
            );
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
        }
        break;
      case "review":
        title = <h1 className="title">Summary</h1>;
        leftIcon = <div></div>;
        break;
      default:
        leftIcon = <div></div>;
        title = <h1>PatchPal</h1>;
    }

    if (this.props.fixtureView) {
      leftIcon = (
        <div className="left-icon-div" onClick={this.handleBackClick}>
          <IoIosArrowBack className="left-icon" />
        </div>
      );
      title = <h1>{this.props.selectedFixture.name}</h1>;
    }

    return (
      <header>
        {leftIcon}
        {title}
      </header>
    );
  }
}

export default Header;
