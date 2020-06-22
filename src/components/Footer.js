import React from "react";
import "./Footer.css";
import {
  IoIosList,
  IoIosListBox,
  IoMdAddCircleOutline,
  IoMdAddCircle,
} from "react-icons/io";

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
      <footer className="footer-container-container">
        <div className="footer-container">
          <nav id="footer">
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
          </nav>
        </div>
      </footer>
    );
  }
}

export default Footer;
