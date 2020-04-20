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
    render() {
        const fixture = this.props.fixture;
    return (
        <tr>
            <td>{fixture.manufacturer}</td>
            <td>{fixture.fixture}</td>
            <td>
                <form>
                    <input type="number"></input>
                </form>
            </td>
        </tr>
    )
    };
}

class FixtureTable extends React.Component {
    render() {
        const filterText = this.props.filterText;
        const productionCo = this.props.productionCo;

        const rows = [];
        
        this.props.fixtures.forEach((fixture) => {
            //filter by search
            if (!fixture.manufacturer.toLowerCase().includes(filterText.toLowerCase())) {
                return;
            }
            //filter by production Company
            if (!fixture.productionCos.includes(productionCo.toLowerCase())) {
                return;
            }
            rows.push(
                <FixtureRow
                    fixture={fixture}
                    key = {fixture.fixture} />
            );
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th>Manufacturer</th>
                        <th>Fixture</th>
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

    render() {
        return (
            <div>
                <SearchBar 
                    filterText={this.state.filterText} 
                    onFilterTextChange={this.handleFilterTextChange}
                    onProdCoChange={this.handleProdCoChange}
                />
                <FixtureTable 
                fixtures={this.props.fixtures} 
                filterText={this.state.filterText} 
                productionCo={this.state.productionCo}
                 />
            </div>
        )
    }
}

class TotalPower extends React.Component {

    render() {
        let power = 0;

        this.props.selectFixtures.forEach((fixture) => {
            power += fixture.power*fixture.quantity;
        });
        let amps = power / 240;
        return (
            <div>
                <p>
                    Watts: {power}
                </p>
                <p>
                    Amps (240v): {amps}
                </p>
            </div>
        )
    }

}



class Overview extends React.Component {

    render () {
        return (
            <div>
                <h3>Overview</h3>
                <TotalPower selectFixtures={this.props.selectFixtures}/>
            </div>
        )
    }
}

class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            selectFixtures: [    
                {
                "manufacturer": "Robe",
                "fixture": "Spiider",
                "type": "LED",
                "power": 600,
                "blackoutPower": 600,
                "weight": 13.3,
                "citation": "https://cdn.robe.cz/fileadmin/user_upload/product_pdf/en_spiider.pdf",
                "productionCos": ["default", "cse"],
                "quantity": 3
          
              },
              {
                "manufacturer": "Showtec",
                "fixture": "Stage Blinder 2",
                "type": "Generic",
                "power": 1300,
                "blackoutPower": 1300,
                "weight": 2.96,
                "citation": "https://www.thomann.de/gb/showtec_stage_blinder_2_dmx.htm",
                "productionCos": ["default", "cse", "siyan"],
                "quantity": 0
              },],
        }
    }


    render() {
        return (
            <div>
                <FilterableFixtureTable fixtures = {FIXTURES.fixtures}/>
                <Overview selectFixtures={this.state.selectFixtures}/>
            </div>
        )
    }
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