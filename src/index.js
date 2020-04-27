import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var FIXTURES;
const VOLTAGE = 230;

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
        this.state = {
            fixtureDetails: (<div></div>),
            fixtureDetailToggle: false
        };
        this.handleFixtureChange = this.handleFixtureChange.bind(this);
        this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this);
        this.handleFixtureClick = this.handleFixtureClick.bind(this);
    }
    

    handleFixtureChange(e) {
        this.props.onFixtureChange(this.props.fixture.id, e.target.value);
    }

    handleRemoveButtonClick() {
        this.props.onRemoveButtonClick(this.props.fixture.id);
    }

    handleFixtureClick(e) {
        if (this.state.fixtureDetailToggle) {
            this.setState({fixtureDetails: (<div></div>)})
            this.setState({fixtureDetailToggle: false});
        } else {
            
            let details = "" + 
                this.props.fixture.weight +"kg, " +
                this.props.fixture.power + "W, " +
                this.props.fixture.type;
            this.setState({fixtureDetails: (<div>{details}</div>)});
            this.setState({fixtureDetailToggle: true});
        }
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
            <tr class="fixture-row">
                <td 
                    onClick={this.handleFixtureClick}
                >
                    <tr>
                        {fixture.manufacturer} 
                        {" "}
                        {fixture.fixture}
                    </tr>
                    <tr>
                        {this.state.fixtureDetails}
                    </tr>
                </td>
                <td>
                    <form 
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                    >
                        <input 
                        class="quantity-input"
                        type="number"
                        value={quantityShown}
                        onChange={this.handleFixtureChange}
                        onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                        />
                        
                    </form>
                </td>
                <td>{removeButton}</td>
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
        const currentTruss = this.props.currentTruss;

        const rows = [];
        
        this.props.fixtures.forEach((fixture) => {

            //filter by search
            if (!fixture.manufacturer.toLowerCase().includes(filterText.toLowerCase()) &&
            !fixture.fixture.toLowerCase().includes(filterText.toLowerCase())) {
                return;
            }

            //filter by truss
            if (fixture.truss) {
                if (fixture.truss !== currentTruss) {
                    return;
                }
            }

            //ignore default filter if search has value
            if (!(filterText && productionCo === "default")) {
            //filter by production Company (or default)
                if(productionCo !== "") {
                    if (!fixture.productionCos.includes(productionCo.toLowerCase())) {
                        return;
                    }
                }
            }

            //replace with selected fixture if necessary

            let fixtureSelectedOrNot = fixture;
            if (this.props.selectedFixtures) {
                this.props.selectedFixtures.forEach((selectFixture) => {
                    if (selectFixture.id === fixture.id && selectFixture.truss===currentTruss) {
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
            <div>
                <div class="fixture-table">
                    <th>Fixture</th>
                    <th>Quantity</th>
                    <div></div>
                </div>

                    {rows}

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
                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
            >
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
                    currentTruss={this.props.currentTruss}
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
                currentTruss={this.props.currentTruss}
                 />
            </div>
        )
    }
}

class BalancePhases extends React.Component {
    render () {
        //let loadperPhase = powerDraw(this.props.selectedFixtures) / 3;
        let fixturePhaseSplit = [];
        let fixtureTypes = [];
        let phaseLoad = [0,0,0]

        //Check what fixture types there are in project
        this.props.selectedFixtures.forEach((fixture) => {
            if(!fixtureTypes.includes(fixture.id)) {
                fixtureTypes.push(fixture.id);
            }
        });
        console.table(phaseLoad);
        //add up fixture totals
        fixtureTypes.forEach((id) => {
            //check highest Phase, get index of next phase
            let indexNextPhase = 0;
            if (phaseLoad[0] !== phaseLoad[1] || phaseLoad[0] !== phaseLoad[2] || phaseLoad[1] !== phaseLoad[2]){
                let maxPower=0;
                
                phaseLoad.forEach((load) => {
                    if (load>maxPower){
                        maxPower = load;
                    }
                });
                indexNextPhase = phaseLoad.indexOf(maxPower) + 1;
            }
            let fixture = getObj(this.props.selectedFixtures,'id',id);
            let phaseCount = [0,0,0];
            let sum = 0;
            //bit boring here because fixtures could be selected twice under different truss
            this.props.selectedFixtures.forEach((fixture) => {
                if (fixture.id === id) {
                    sum += fixture.quantity;
                }
            });
            //round robin phases
            for (let i=0;i<sum; i++) {
                phaseCount[(indexNextPhase+i)%3] ++;
                if(fixture) {
                    console.log(fixture.power);
                    phaseLoad[(indexNextPhase+i)%3] += fixture.power;
                }
            }
            console.table(phaseLoad);
            fixturePhaseSplit.push((<div>{getObj(this.props.selectedFixtures,'id',id).fixture}</div>));
            phaseCount.forEach((phase) => {
                fixturePhaseSplit.push((<div>{phase}</div>));
            })
        });

        let printablePhaseLoads = phaseLoad.map((phase) => {
            return((<div>{printPower(phase)}</div>));
        });
        let printablePhaseAmps = phaseLoad.map((phase) => {
            return((<div>{Math.ceil(phase/VOLTAGE)}A</div>));
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
            <div>
                <p>
                    Power: {printPower(power)}
                </p>
                <p>
                    Current ({VOLTAGE}v): {Math.ceil(amps)}A
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
                if (fixture.quantity >=1) {
                    weight += Number(fixture.weight)*Number(fixture.quantity);
                }
            });
        }


        return (
            <p>
                Weight: {weight.toFixed(0)}kg
            </p>
        )
    }
}

class TrussBreakdown extends React.Component {
    render() {
        let trussBreakdowns = [];
        this.props.trussList.forEach((truss) => {
            let trussSelected = [];
            this.props.selectedFixtures.forEach((fixture) => {
                if(fixture.truss === truss) {
                    trussSelected.push(fixture);
                }
            })
            trussBreakdowns.push(
                <Totals 
                    name={truss}
                    selectedFixtures={trussSelected}
                />
            );
        });
        return (
            <div>
                {trussBreakdowns}
            </div>
        )
    }
}
class Totals extends React.Component {

    render () {
        let fixtureCount = 0;
        this.props.selectedFixtures.forEach((fixture) =>{
            fixtureCount += Number(fixture.quantity);
        });
        return (
            <div >
                <h2>{this.props.name}</h2>
                <div class="totals">
                    <TotalPower selectedFixtures={this.props.selectedFixtures}/>
                    <div>
                        <TotalWeight selectedFixtures={this.props.selectedFixtures}/>
                        <p>Fixture Count: {fixtureCount}</p>
                    </div>

                </div>
            </div>
        )
    }
}

class FixtureSelector extends React.Component {
    constructor(props) {
        super(props);
        this.handleFixtureChange = this.handleFixtureChange.bind(this);
        //this.handleSelectedFixtureChange = this.handleSelectedFixtureChange.bind(this);
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
            <div class="fixture-selector">
                <FilterableFixtureTable 
                    fixtures = {FIXTURES.fixtures}
                    selectedFixtures={this.props.selectedFixtures}
                    onFixtureChange = {this.handleFixtureChange}
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
        )
    }
}

class TrussSelector extends React.Component {
    constructor(props) {
        super(props);
    this.handleTrussSelect = this.handleTrussSelect.bind(this);
    }

    handleTrussSelect (e) {
        this.props.onTrussSelect(e.target.dataset.truss)
    }

    render () {
        let trussSeperated = [];
        this.props.trussList.forEach((trussName)=>{
            trussSeperated.push(
                <div
                    style={(this.props.currentTruss===trussName)?{
                        fontWeight: "bold"
                    }:{
                        fontWeight: "lighter"
                    }}
                    data-truss={trussName}
                    onClick={this.handleTrussSelect}>
                    {trussName}
                </div>
            )
        });
        return (
            <div id="truss-selector">
                {trussSeperated}
            </div>
        )
    }
}

class Build extends React.Component {
    constructor(props) {
        super(props);
        this.handleFixtureChange = this.handleFixtureChange.bind(this);
        this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this);
        this.handleTrussSelect = this.handleTrussSelect.bind(this);
    }

    handleTrussSelect (trussName) {
        this.props.onTrussSelect(trussName);
    }

    handleFixtureChange (fixtureId, quantity) {
        this.props.onFixtureChange(fixtureId, quantity);
    }

    handleRemoveButtonClick (fixtureId) {
        this.props.onRemoveButtonClick(fixtureId);
    }

    render() {
        return (
            <div>
                <TrussSelector
                    onTrussSelect={this.handleTrussSelect}
                    trussList = {this.props.trussList}
                    currentTruss={this.props.currentTruss}
                />
                <FixtureSelector 
                    selectedFixtures={this.props.selectedFixtures}
                    onFixtureChange={this.handleFixtureChange}
                    onRemoveButtonClick={this.handleRemoveButtonClick}
                    currentTruss={this.props.currentTruss}
                />
                <div class="total-footer">
                    <Totals 
                        selectedFixtures={this.props.selectedFixtures}
                        name="Total"
                    />
                </div>

            </div>
        )
    }
}

class Review extends React.Component {
    render() {
        return(
            <div>
                <div class="review-details">
                    <TrussBreakdown 
                        selectedFixtures={this.props.selectedFixtures}
                        trussList = {this.props.trussList}
                    />  
                    <BalancePhases
                        selectedFixtures={this.props.selectedFixtures}
                    />
                </div>
                <div class="total-footer">
                    <Totals 
                        selectedFixtures={this.props.selectedFixtures}
                        name="Total"
                    /> 
                </div> 
            </div>
        )
    }
}
class App extends React.Component {
    constructor (props) {
        super(props);
        this.state={
            //use trussList to allow user defined trusses at some point
            trussList: ["Project","Truss 1", "Truss 2", "Truss 3"],
            currentTruss: "Project",
            mode: "build",
            selectedFixtures: [],
        }
        this.handleFixtureChange = this.handleFixtureChange.bind(this);
        this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this);
        this.handleTrussSelect = this.handleTrussSelect.bind(this);
        this.handleBuildMode = this.handleBuildMode.bind(this);
    }
    handleBuildMode(e) {
        this.setState({
            mode: e.target.dataset.mode,
        });
    }

    handleTrussSelect (trussName) {
        this.setState({
            currentTruss: trussName,
        });
    }


    handleFixtureChange (fixtureId, quantity) {
        quantity = parseInt(quantity);
        
        let updatedSelectedFixtures = this.state.selectedFixtures.slice();

        let newFixture = getObj(FIXTURES.fixtures,"id",fixtureId);

        if (newFixture) {
            let fixtureAlreadySelected = false;
            updatedSelectedFixtures.forEach((fixture) => {
                if (fixture.id === fixtureId && fixture.truss === this.state.currentTruss) {
                    fixture.quantity = quantity;
                    fixtureAlreadySelected = true;
                    return;
                }
            })

            if(!fixtureAlreadySelected) {
                newFixture.quantity = quantity;
                newFixture.selected = true;
                newFixture.truss = this.state.currentTruss;
                updatedSelectedFixtures.push(newFixture);
            }
        }

        this.setState({
            selectedFixtures: updatedSelectedFixtures,
        });
    }

    handleRemoveButtonClick (fixtureId) {
        let remainingFixtures = this.state.selectedFixtures.filter((fixture) => {
            return (!(fixtureId === fixture.id && fixture.truss === this.state.currentTruss));
        });
        this.setState({
            selectedFixtures: remainingFixtures,
        });
    }

    render() {
        let page = (
            <Build
                onTrussSelect={this.handleTrussSelect}
                currentTruss={this.state.currentTruss}
                selectedFixtures={this.state.selectedFixtures}
                onRemoveButtonClick={this.handleRemoveButtonClick}
                onFixtureChange={this.handleFixtureChange}
                trussList = {this.state.trussList}
        />
        );
        if (this.state.mode === "review") {
            page = (
            <Review 
                trussList = {this.state.trussList}
                selectedFixtures={this.state.selectedFixtures}
            />
            );
        }

        let reviewStyle = (this.state.mode==="review") ? {fontWeight: 'bold'} : {fontWeight: 'lighter'};
        let buildStyle = (this.state.mode==="build") ? {fontWeight: 'bold'} : {fontWeight: 'lighter'};

        return (
            <div>
                <div id="header">
                    <h1>PatchPal</h1>
                    <h2 
                        style={buildStyle}
                        onClick={this.handleBuildMode} 
                        data-mode="build"
                        >Build</h2>
                    <h2
                        style={reviewStyle}
                        onClick={this.handleBuildMode} 
                        data-mode="review"
                    >Review</h2>
                </div>
            {page}
            </div>
        )
    }
}

//function to prettify power results - number in, string out
function printPower (power) {
    let visualPower = Math.ceil(power).toString() + "W";

    if (power>1000) {
        visualPower = (power/1000).toFixed(2).toString() + "kW"
    }
    return visualPower;
}



//function to get total power draw from selected fixtures
function powerDraw (selectedFixtures) {
    let power = 0;
    if (selectedFixtures) {
        selectedFixtures.forEach((fixture) => {
            if (fixture.quantity >= 1) {
                power += Number(fixture.power)*Number(fixture.quantity);
            }
        });
    }
    return power;
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