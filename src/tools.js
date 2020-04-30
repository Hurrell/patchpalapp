//function to prettify power results - number in, string out
function printPower (power) {
    let visualPower = {
        number: Math.ceil(power),
        unit: "W"
    };

    if (power>1000) {
        visualPower = {
            number: (power/1000).toFixed(1),
            unit: "kW"

        }
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

export {printPower, powerDraw, getObj}