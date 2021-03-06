import React from "react";
import "./SearchBar.css";

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
        className="search-form"
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
      </form>
    );
  }
}

export default SearchBar;
