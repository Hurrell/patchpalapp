import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var FIXTURES;


/*components
    1) App
    2) Fixture Selector
    3) User Input 
        search text ---state
        value of dropdown --state
    4) Selected Fixtures ---props
    5) Searched Fixtures ---props
    6) Fixture (smol view) --props
*/

class FixtureRow extends React.Component {
    constructor(props) {
        super(props);
        this.handleFixtureChange = this.handleFixtureChange.bind(this);
        this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this);
    }

    handleFixtureChange(e) {
        this.props.onFixtureChange(this.props.fixture.id, e.target.value);
    }

    handleRemoveButtonClick() {
        this.props.onRemoveButtonClick(this.props.fixture.id);
    }
    render() {
        const fixture = this.props.fixture;

        let removeButton = "";
        if (fixture.selected) {
            removeButton = (<button 
                type="button" 
                onClick={this.handleRemoveButtonClick}
                >
                Remove
                </button>)
        }
        let quantityShown = "";
        if(fixture.quantity) {
            quantityShown = fixture.quantity;
        }

        return (
            <tr>
                <td>{fixture.manufacturer}</td>
                <td>{fixture.fixture}</td>
                <td>
                    <form>
                        <input 
                        type="number"
                        value={quantityShown}
                        onChange={this.handleFixtureChange}
                        />
                        {removeButton}
                    </form>
                </td>
            </tr>
        )
    };
}

class FixtureTable extends React.Component {
    constructor(props) {
        super(props);
        this.handleFixtureChange = this.handleFixtureChange.bind(this);
        this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this);
    }

    handleFixtureChange(fixtureId,quantity) {
        this.props.onFixtureChange(fixtureId,quantity);
    }

    handleRemoveButtonClick(fixtureId) {
        this.props.onRemoveButtonClick(fixtureId);
    }

    render() {
        const filterText = this.props.filterText;
        const productionCo = this.props.productionCo;

        const rows = [];
        
        this.props.fixtures.forEach((fixture) => {
            //filter by search
            if (!fixture.manufacturer.toLowerCase().includes(filterText.toLowerCase()) &&
            !fixture.fixture.toLowerCase().includes(filterText.toLowerCase())) {
                return;
            }
            //ignore default filter if search has value

            //filter by production Company
            if(productionCo !== "") {
                if (!fixture.productionCos.includes(productionCo.toLowerCase())) {
                    return;
                }
            }
            //replace with selected fixture if necessary
            let fixtureSelectedOrNot = fixture;
            if (this.props.selectedFixtures) {
                this.props.selectedFixtures.forEach((selectFixture) => {
                    if (selectFixture.id === fixture.id) {
                        fixtureSelectedOrNot = selectFixture;
                        return;
                    }
                })
            }

            rows.push(
                <FixtureRow
                    fixture={fixtureSelectedOrNot}
                    key = {fixture.id} 
                    onFixtureChange={this.handleFixtureChange}
                    onRemoveButtonClick={this.handleRemoveButtonClick}
                    />
            );
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th>Manufacturer</th>
                        <th>Fixture</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
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
            <form>
                <input 
                    type="text" 
                    placeholder="Search..." 
                    value={filterText} 
                    onChange={this.handleFilterTextChange}
                />
                <p>
                    <select onChange={this.handleProdCoChange}>
                        <option value = "default">Filter by Production Co.</option>
                        <option value = "CSE">CSE</option>
                        <option value = "Siyan">Siyan</option>
                    </select>
                </p>
            </form>
        )
    }
}

class FilterableFixtureTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            productionCo: 'default'
        };

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleProdCoChange = this.handleProdCoChange.bind(this);
        this.handleFixtureChange = this.handleFixtureChange.bind(this);
        this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this);
    }

    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    handleProdCoChange(productionCo) {
        this.setState({
            productionCo: productionCo
        });
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
                <h2>Add fixtures</h2>
                <SearchBar 
                    filterText={this.state.filterText} 
                    onFilterTextChange={this.handleFilterTextChange}
                    onProdCoChange={this.handleProdCoChange}
                />
                <FixtureTable 
                    fixtures={this.props.fixtures} 
                    selectedFixtures={this.props.selectedFixtures}
                    filterText={this.state.filterText} 
                    productionCo={this.state.productionCo}
                    onFixtureChange={this.handleFixtureChange}
                    onRemoveButtonClick={this.handleRemoveButtonClick}
                 />
            </div>
        )
    }
}

class SelectedFixturesTable extends React.Component {
    constructor (props) {
        super(props);
        this.handleFixtureChange = this.handleFixtureChange.bind(this);
        this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this);
    }

    handleFixtureChange (fixtureId,quantity) {
        this.props.onFixtureChange(fixtureId,quantity);
    }

    handleRemoveButtonClick(fixtureId) {
        this.props.onRemoveButtonClick(fixtureId);
    }

    render() {
        return (
            <div>
                <h2>
                    Selected Fixtures
                </h2>
                <FixtureTable 
                fixtures={this.props.selectedFixtures} 
                filterText={""} 
                productionCo={""}
                onFixtureChange={this.handleFixtureChange}
                onRemoveButtonClick={this.handleRemoveButtonClick}
                 />
            </div>
        )
    }
}

class TotalPower extends React.Component {

    render() {
        let power = 0;
        if (this.props.selectedFixtures) {
            this.props.selectedFixtures.forEach((fixture) => {
                power += fixture.power*fixture.quantity;
            });
        }

        let amps = power / 230;

        let visualPower = Math.ceil(power).toString() + "W";

        if (power>10000) {
            visualPower = (power/1000).toFixed(2).toString() + "kW"
        }

        return (
            <div>
                <p>
                    Power: {visualPower}
                </p>
                <p>
                    Current (230v): {Math.ceil(amps)}A
                </p>
            </div>
        )
    }
}

class TotalWeight extends React.Component {

    render() {
        let weight = 0;
        if (this.props.selectedFixtures) {
            this.props.selectedFixtures.forEach((fixture) => {
                weight += fixture.weight*fixture.quantity;
            });
        }


        return (
            <p>
                Weight: {weight.toFixed(0)}kg
            </p>
        )
    }
}

class Overview extends React.Component {

    render () {
        return (
            <div>
                <h2>Overview</h2>
                <TotalPower selectedFixtures={this.props.selectedFixtures}/>
                <TotalWeight selectedFixtures={this.props.selectedFixtures}/>
            </div>
        )
    }
}

class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            selectedFixtures: [],
        }
        this.handleFixtureChange = this.handleFixtureChange.bind(this);
        this.handleSelectedFixtureChange = this.handleSelectedFixtureChange.bind(this);
        this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this);
    }

    handleFixtureChange (fixtureId, quantity) {
        quantity = parseInt(quantity);
        
        let updatedSelectedFixtures = this.state.selectedFixtures.slice();

        let newFixture = getObj(FIXTURES.fixtures,"id",fixtureId);

        if (newFixture) {
            let fixtureAlreadySelected = false;
            updatedSelectedFixtures.forEach((fixture) => {
                if (fixture.id === fixtureId) {
                    fixture.quantity = quantity;
                    fixtureAlreadySelected = true;
                    return;
                }
            })

            if(!fixtureAlreadySelected) {
                newFixture.quantity = quantity;
                newFixture.selected = true;
                updatedSelectedFixtures.push(newFixture);
            }
        }

        this.setState({
            selectedFixtures: updatedSelectedFixtures,
        });
    }

    handleSelectedFixtureChange (selectedFixtures) {
        this.setState({
            selectedFixtures: selectedFixtures,
        });
    }

    handleRemoveButtonClick (fixtureId) {
        let removedFixtures = this.state.selectedFixtures.filter( (fixture) => {
            if (fixture.id === fixtureId) {
                return false;
            } else {
                return true;
            }
        });
        this.setState({
            selectedFixtures: removedFixtures,
        });
    }


    render() {
        return (
            <div>
            <h1>PatchPal</h1>
                <FilterableFixtureTable 
                fixtures = {FIXTURES.fixtures}
                selectedFixtures={this.state.selectedFixtures}
                onFixtureChange = {this.handleFixtureChange}
                onRemoveButtonClick={this.handleRemoveButtonClick}
                />
                <Overview selectedFixtures={this.state.selectedFixtures}/>
                <SelectedFixturesTable 
                    selectedFixtures={this.state.selectedFixtures} 
                    onFixtureChange={this.handleFixtureChange}
                    onRemoveButtonClick={this.handleRemoveButtonClick}
                />
            </div>
        )
    }
}

//Function to return an object from list using key
function getObj (list, keyName, id) {
    let foundObj;
    list.forEach((obj) => {
        if (obj[keyName]===id) {
            foundObj = { ...obj};
            return;
        }
    });
    return foundObj;
}

//Request json and only render page when json retreived
const xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        FIXTURES = JSON.parse(this.responseText);
        
        ReactDOM.render(
            <App />,
            document.querySelector('#root')
        );
    }
};
xmlhttp.open("GET", "fixtureData.json", true);
xmlhttp.send();