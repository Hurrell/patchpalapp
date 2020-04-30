import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { printPower, powerDraw, getObj } from "./tools.js";
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

class FixtureAdd extends React.Component {
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
    if (fixture.quantity || fixture.quantity === 0) {
      quantityShown = fixture.quantity;
      minusSymbol = (
        <div onClick={this.handleMinus}>
          <IoIosRemove class="plus-minus-icon" />
        </div>
      );
    }
    return (
      <div class="fixture-change">
        {minusSymbol}
        <form
          class="quantity-input"
          onKeyPress={(e) => {
            e.key === "Enter" && e.preventDefault();
          }}
        >
          <input
            //background-image={plusSign}
            //max="99"
            placeholder="+"
            type="number"
            value={quantityShown}
            onChange={this.handleFixtureChange}
            onKeyDown={(evt) =>
              ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
            }
          />
        </form>
        <div onClick={this.handlePlus}>
          <IoIosAdd class="plus-minus-icon" />
        </div>
      </div>
    );
  }
}
class FixtureRow extends React.Component {
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
          class="remove-button"
          type="button"
          onClick={this.handleRemoveButtonClick}
        >
          <IoMdClose class="remove-button-x" />
        </button>
      );
    }

    //let plusSign = (<IoIosAdd/>);
    return (
      <div class="fixture-row">
        <div class="remove-button-container">{removeButton}</div>
        <div>
          <div>
            <span onClick={this.handleFixtureClick}>
              {fixture.manufacturer} {fixture.name}
            </span>
          </div>
          <div class="fixture-in-row-details">
            {fixture.power}W · {fixture.weight}kg
          </div>
        </div>
        <FixtureAdd
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
    //const productionCo = this.props.productionCo;
    const currentTruss = this.props.currentTruss;

    const rows = [];

    this.props.fixtures.forEach((fixture) => {
      //filter by search
      if (
        !fixture.manufacturer
          .toLowerCase()
          .includes(filterText.toLowerCase()) &&
        !fixture.name.toLowerCase().includes(filterText.toLowerCase())
      ) {
        return;
      }

      // //filter by truss
      // if (fixture.truss) {
      //     if (fixture.truss !== currentTruss) {
      //         return;
      //     }
      // }

      // //ignore default filter if search has value
      // if (!(filterText && productionCo === "default")) {
      // //filter by production Company (or default)
      //     if(productionCo !== "") {
      //         if (!fixture.productionCos.includes(productionCo.toLowerCase())) {
      //             return;
      //         }
      //     }
      // }

      //replace with selected fixture if necessary

      let fixtureSelectedOrNot = fixture;
      if (this.props.selectedFixtures) {
        this.props.selectedFixtures.forEach((selectFixture) => {
          if (
            selectFixture.id === fixture.id &&
            selectFixture.truss === currentTruss
          ) {
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

    return <div class="fixture-table">{rows}</div>;
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
          class="search"
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

class FilterableFixtureTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      productionCo: "default",
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleProdCoChange = this.handleProdCoChange.bind(this);
    this.handleFixtureChange = this.handleFixtureChange.bind(this);
    this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this);
    this.handleFixtureClick = this.handleFixtureClick.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText,
    });
  }

  handleProdCoChange(productionCo) {
    this.setState({
      productionCo: productionCo,
    });
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
    return (
      <div>
        <FixtureTable
          fixtures={this.props.fixtures}
          selectedFixtures={this.props.selectedFixtures}
          filterText={this.props.filterText}
          productionCo={this.state.productionCo}
          onFixtureChange={this.handleFixtureChange}
          onRemoveButtonClick={this.handleRemoveButtonClick}
          currentTruss={this.props.currentTruss}
          onFixtureClick={this.handleFixtureClick}
        />
      </div>
    );
  }
}

class SelectedFixturesTable extends React.Component {
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
    let fixtureCount = 0;
    this.props.selectedFixtures.forEach((fixture) => {
      fixtureCount += Number(fixture.quantity);
    });
    return (
      <div>
        <h2>Selected Fixtures ({fixtureCount})</h2>
        <FixtureTable
          fixtures={this.props.selectedFixtures}
          filterText={""}
          productionCo={""}
          onFixtureChange={this.handleFixtureChange}
          onRemoveButtonClick={this.handleRemoveButtonClick}
          currentTruss={this.props.currentTruss}
          onFixtureClick={this.handleFixtureClick}
        />
      </div>
    );
  }
}

class BalancePhases extends React.Component {
  render() {
    //let loadperPhase = powerDraw(this.props.selectedFixtures) / 3;
    let fixturePhaseSplit = [];
    let fixtureTypes = [];
    let phaseLoad = [0, 0, 0];

    //Check what fixture types there are in project
    this.props.selectedFixtures.forEach((fixture) => {
      if (!fixtureTypes.includes(fixture.id)) {
        fixtureTypes.push(fixture.id);
      }
    });
    //add up fixture totals
    fixtureTypes.forEach((id) => {
      //check highest Phase, get index of next phase
      let indexNextPhase = 0;
      if (
        phaseLoad[0] !== phaseLoad[1] ||
        phaseLoad[0] !== phaseLoad[2] ||
        phaseLoad[1] !== phaseLoad[2]
      ) {
        let maxPower = 0;

        phaseLoad.forEach((load) => {
          if (load > maxPower) {
            maxPower = load;
          }
        });
        indexNextPhase = phaseLoad.indexOf(maxPower) + 1;
      }
      let fixture = getObj(this.props.selectedFixtures, "id", id);
      let phaseCount = [0, 0, 0];
      let sum = 0;
      //bit boring here because fixtures could be selected twice under different truss
      this.props.selectedFixtures.forEach((fixture) => {
        if (fixture.id === id) {
          sum += fixture.quantity;
        }
      });
      //round robin phases
      for (let i = 0; i < sum; i++) {
        phaseCount[(indexNextPhase + i) % 3]++;
        if (fixture) {
          phaseLoad[(indexNextPhase + i) % 3] += fixture.power;
        }
      }
      fixturePhaseSplit.push(
        <div>{getObj(this.props.selectedFixtures, "id", id).fixture}</div>
      );
      phaseCount.forEach((phase) => {
        fixturePhaseSplit.push(<div>{phase}</div>);
      });
    });

    let printablePhaseLoads = phaseLoad.map((phase) => {
      return <div>{printPower(phase)}</div>;
    });
    let printablePhaseAmps = phaseLoad.map((phase) => {
      return <div>{Math.ceil(phase / VOLTAGE)}A</div>;
    });
    return (
      <div>
        <h2>Phase Balance</h2>
        <div class="phase-table">
          <div></div>
          <div>Φ1</div>
          <div>Φ2</div>
          <div>Φ3</div>
          {fixturePhaseSplit}
        </div>
        -------------------------------------
        <div>Total</div>
        <div class="phase-table">
          <div>Power</div>
          {printablePhaseLoads}
          <div>Current</div>
          {printablePhaseAmps}
        </div>
      </div>
    );
  }
}
class TotalPower extends React.Component {
  render() {
    let power = powerDraw(this.props.selectedFixtures);

    let amps = power / VOLTAGE;

    return (
      <div class="review-power">
        <span class="review-total">{printPower(power).number}</span>
        <span class="review-unit">{printPower(power).unit}</span>
        {/* <p>
                    {Math.ceil(amps)}A
                </p> */}
      </div>
    );
  }
}

class TotalAmps extends React.Component {
  render() {
    let power = powerDraw(this.props.selectedFixtures);

    let amps = power / VOLTAGE;

    return (
      <div class="review-amps">
        <span class="review-total ">{Math.ceil(amps)}</span>
        <span class="review-unit">
          A<sup>({VOLTAGE}v)</sup>
        </span>
      </div>
    );
  }
}

class TotalWeight extends React.Component {
  render() {
    let weight = 0;
    if (this.props.selectedFixtures) {
      this.props.selectedFixtures.forEach((fixture) => {
        if (fixture.quantity >= 1) {
          weight += Number(fixture.weight) * Number(fixture.quantity);
        }
      });
    }

    return (
      <div class="review-weight">
        <span class="review-total">{weight.toFixed(0)}</span>
        <span class="review-unit">kg</span>
      </div>
    );
  }
}

class TrussBreakdown extends React.Component {
  render() {
    let trussBreakdowns = [];
    this.props.trussList.forEach((truss) => {
      let trussSelected = [];
      this.props.selectedFixtures.forEach((fixture) => {
        if (fixture.truss === truss) {
          trussSelected.push(fixture);
        }
      });
      trussBreakdowns.push(
        <Totals name={truss} selectedFixtures={trussSelected} />
      );
    });
    return <div>{trussBreakdowns}</div>;
  }
}
class Totals extends React.Component {
  render() {
    let fixtureCount = 0;
    this.props.selectedFixtures.forEach((fixture) => {
      fixtureCount += Number(fixture.quantity);
    });
    return (
      <div>
        <div class="totals">
          <TotalPower selectedFixtures={this.props.selectedFixtures} />

          <TotalWeight selectedFixtures={this.props.selectedFixtures} />
          {/* <p>Fixture Count: {fixtureCount}</p> */}
          <TotalAmps selectedFixtures={this.props.selectedFixtures} />
        </div>
      </div>
    );
  }
}

class FixtureSelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleFixtureChange = this.handleFixtureChange.bind(this);
    //this.handleSelectedFixtureChange = this.handleSelectedFixtureChange.bind(this);
    this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this);
  }

  handleFixtureChange(fixtureId, quantity) {
    this.props.onFixtureChange(fixtureId, quantity);
  }

  handleRemoveButtonClick(fixtureId) {
    this.props.onRemoveButtonClick(fixtureId);
  }

  render() {
    return (
      <div class="fixture-selector">
        <FilterableFixtureTable
          fixtures={APPDATA.fixtures}
          selectedFixtures={this.props.selectedFixtures}
          onFixtureChange={this.handleFixtureChange}
          onRemoveButtonClick={this.handleRemoveButtonClick}
          currentTruss={this.props.currentTruss}
        />
        <SelectedFixturesTable
          selectedFixtures={this.props.selectedFixtures}
          onFixtureChange={this.handleFixtureChange}
          onRemoveButtonClick={this.handleRemoveButtonClick}
          currentTruss={this.props.currentTruss}
        />
      </div>
    );
  }
}

class TrussSelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleTrussSelect = this.handleTrussSelect.bind(this);
  }

  handleTrussSelect(e) {
    this.props.onTrussSelect(e.target.dataset.truss);
  }

  render() {
    let trussSeperated = [];
    this.props.trussList.forEach((trussName) => {
      trussSeperated.push(
        <div
          style={
            this.props.currentTruss === trussName
              ? {
                  fontWeight: "bold",
                }
              : {
                  fontWeight: "lighter",
                }
          }
          data-truss={trussName}
          onClick={this.handleTrussSelect}
        >
          {trussName}
        </div>
      );
    });
    return <div id="truss-selector">{trussSeperated}</div>;
  }
}

class Build extends React.Component {
  constructor(props) {
    super(props);
    this.handleFixtureChange = this.handleFixtureChange.bind(this);
    this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this);
    this.handleTrussSelect = this.handleTrussSelect.bind(this);
  }

  handleTrussSelect(trussName) {
    this.props.onTrussSelect(trussName);
  }

  handleFixtureChange(fixtureId, quantity) {
    this.props.onFixtureChange(fixtureId, quantity);
  }

  handleRemoveButtonClick(fixtureId) {
    this.props.onRemoveButtonClick(fixtureId);
  }

  render() {
    return (
      <div>
        {/* <TrussSelector
                    onTrussSelect={this.handleTrussSelect}
                    trussList = {this.props.trussList}
                    currentTruss={this.props.currentTruss}
                /> */}
        <FixtureSelector
          selectedFixtures={this.props.selectedFixtures}
          onFixtureChange={this.handleFixtureChange}
          onRemoveButtonClick={this.handleRemoveButtonClick}
          currentTruss={this.props.currentTruss}
        />
        <div class="total-footer">
          <Totals selectedFixtures={this.props.selectedFixtures} name="Total" />
        </div>
      </div>
    );
  }
}

class FixtureDetails extends React.Component {
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
    return (
      <div class="fixture-details">
        <div>Manufacturer: {this.props.fixture.manufacturer}</div>
        <div>Weight: {this.props.fixture.weight}kg</div>
        <div>Power: {this.props.fixture.power}W</div>
        <div>Type: {this.props.fixture.type}</div>
        <div>
          Docs: {manual} {specSheet}
        </div>
        {/* <div>Rented by: {this.props.fixture.productionCos}</div> */}
      </div>
    );
  }
}

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.handleFixtureChange = this.handleFixtureChange.bind(this);
    //this.handleSelectedFixtureChange = this.handleSelectedFixtureChange.bind(this);
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
    return (
      <div>
        {/* <div class="review-details">
                    <TrussBreakdown 
                        selectedFixtures={this.props.selectedFixtures}
                        trussList = {this.props.trussList}
                    />   
                    <BalancePhases
                        selectedFixtures={this.props.selectedFixtures}
                    />
                </div> */}
        <div>
          <Totals
            selectedFixtures={this.props.selectedFixtures}
            name="Totals"
          />
        </div>
        <div>
          <SelectedFixturesTable
            selectedFixtures={this.props.selectedFixtures}
            onFixtureChange={this.handleFixtureChange}
            onRemoveButtonClick={this.handleRemoveButtonClick}
            currentTruss={this.props.currentTruss}
            onFixtureClick={this.handleFixtureClick}
          />
        </div>
      </div>
    );
  }
}

class Header extends React.Component {
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
    //let backLink;
    //let searchBar;
    let headerClass = "header";
    // let searchBarExtend = (<SearchBar
    //         filterText={this.props.filterText}
    //         onFilterTextChange={this.handleFilterTextChange}
    //         //onProdCoChange={this.handleProdCoChange}
    //         />)
    switch (this.props.mode) {
      case "build":
        switch (this.state.searchExtended) {
          case true:
            title = (
              <div>
                <SearchBar
                  filterText={this.props.filterText}
                  onFilterTextChange={this.handleFilterTextChange}
                  //onProdCoChange={this.handleProdCoChange}
                />
              </div>
            );
            leftIcon = (
              <div class="left-icon-div" onClick={this.handleBackClick}>
                <IoIosArrowBack class="left-icon" />
              </div>
            );
            // rightIcon = (<IoMdClose
            //     class="right-icon"
            //     onClick={this.handleClearSearch}
            //     />
            //     )
            headerClass = "header-search";
            rightIcon = <div></div>;
            break;
          default:
            title = (
              <h1 class="title" onClick={this.handleSearchClick}>
                PatchPal
              </h1>
            );
            leftIcon = (
              <div class="left-icon-div" onClick={this.handleSearchClick}>
                <IoIosSearch class="left-icon" />
              </div>
            );
            rightIcon = <div></div>;
            //backLink = (<div></div>);
            headerClass = "header";
        }
        break;
      case "review":
        title = <h1 class="title">Summary</h1>;
        leftIcon = <div></div>;
        headerClass = "header-review";
        rightIcon = <div></div>;
        break;
      default:
        leftIcon = <div></div>;
        rightIcon = <div></div>;
        title = <h1>PatchPal</h1>;
    }

    if (this.props.fixtureView) {
      leftIcon = (
        <div class="left-icon-div" onClick={this.handleBackClick}>
          <IoIosArrowBack class="left-icon" />
        </div>
      );
      title = <h1>{this.props.selectedFixture.name}</h1>;
      rightIcon = <div></div>;
      headerClass = "header";
    }

    return (
      <div class={headerClass}>
        {leftIcon}
        {title}
        {rightIcon}
      </div>
    );
  }
}

class Footer extends React.Component {
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
        <IoMdAddCircle class="footer-icon" />
      ) : (
        <IoMdAddCircleOutline class="footer-icon" />
      );
    let listIcon =
      this.props.mode === "review" ? (
        <IoIosListBox class="footer-icon" />
      ) : (
        <IoIosList class="footer-icon" />
      );

    return (
      <div id="footer">
        <div></div>
        <div
          class="child-clicks-this"
          style={buildStyle}
          onClick={this.handleBuildMode}
          data-mode="build"
        >
          {searchIcon}
        </div>
        <div></div>
        <div
          class="child-clicks-this"
          pointer-events="none"
          style={reviewStyle}
          onClick={this.handleBuildMode}
          data-mode="review"
        >
          {listIcon}
        </div>
        <div></div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ////use trussList to allow user defined trusses at some point
      //trussList: ["Project","Truss 1", "Truss 2", "Truss 3"],
      //currentTruss: "Project",
      mode: "build",
      projectFixtures: [],
      filterText: "",
      selectedFixture: {},
      fixtureView: false,
    };
    this.handleFixtureChange = this.handleFixtureChange.bind(this);
    this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this);
    //this.handleTrussSelect = this.handleTrussSelect.bind(this);
    this.handleBuildMode = this.handleBuildMode.bind(this);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleFixtureClick = this.handleFixtureClick.bind(this);
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

  // handleTrussSelect (trussName) {
  //     this.setState({
  //         currentTruss: trussName,
  //     });
  // }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText,
    });
  }

  handleFixtureChange(fixtureId, quantity) {
    quantity = parseInt(quantity);

    let updatedSelectedFixtures = this.state.projectFixtures.slice();

    let newFixture = getObj(APPDATA.fixtures, "id", fixtureId);

    if (newFixture) {
      let fixtureAlreadySelected = false;
      updatedSelectedFixtures.forEach((fixture) => {
        if (
          fixture.id === fixtureId &&
          fixture.truss === this.state.currentTruss
        ) {
          fixture.quantity = quantity;
          fixtureAlreadySelected = true;
          return;
        }
      });

      if (!fixtureAlreadySelected) {
        newFixture.quantity = quantity;
        newFixture.selected = true;
        newFixture.truss = this.state.currentTruss;
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
    let page;
    if (this.state.fixtureView) {
      page = <FixtureDetails fixture={this.state.selectedFixture} />;
    } else {
      if (this.state.mode === "build") {
        page = (
          <FilterableFixtureTable
            fixtures={APPDATA.fixtures}
            selectedFixtures={this.state.projectFixtures}
            onFixtureChange={this.handleFixtureChange}
            onRemoveButtonClick={this.handleRemoveButtonClick}
            filterText={this.state.filterText}
            onFixtureClick={this.handleFixtureClick}
            //currentTruss={this.props.currentTruss}
          />
        );
      } else {
        page = (
          <Review
            trussList={this.state.trussList}
            selectedFixtures={this.state.projectFixtures}
            onFixtureChange={this.handleFixtureChange}
            onRemoveButtonClick={this.handleRemoveButtonClick}
            onFixtureClick={this.handleFixtureClick}
          />
        );
      }
    }

    // let reviewStyle = (this.state.mode==="review") ? {fontWeight: 'bold'} : {fontWeight: 'lighter'};
    // let buildStyle = (this.state.mode==="build") ? {fontWeight: 'bold'} : {fontWeight: 'lighter'};

    return (
      <div class="app">
        <Header
          fixtureView={this.state.fixtureView}
          mode={this.state.mode}
          selectedFixture={this.state.selectedFixture}
          onFilterTextChange={this.handleFilterTextChange}
          onBackClick={this.handleBackClick}
        />
        <div class="page">{page}</div>

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
