//match function
//takes in fixture and filtertext
//returns true if match
//false if not match
function matchAgainst(filterText, fixture) {
  let match = true;
  let filterWords = filterText.split(" ");
  filterWords.forEach((word) => {
    if (
      !(
        fixture.manufacturer.toLowerCase().includes(word.toLowerCase()) ||
        fixture.name.toLowerCase().includes(word.toLowerCase())
      )
    ) {
      match = false;
    }
  });
  return match;
}

//function to prettify power results - number in, obj with number and unit out
function printPower(power) {
  let visualPower = {
    number: Math.ceil(power),
    unit: "W",
  };
  if (power > 1000) {
    visualPower = {
      number: (power / 1000).toFixed(1),
      unit: "kW",
    };
  }
  return visualPower;
}

//Function to return an object from list using key
function getObj(list, keyName, id) {
  let foundObj;
  list.forEach((obj) => {
    if (obj[keyName] === id) {
      foundObj = { ...obj };
      return;
    }
  });
  return foundObj;
}

//Function to return totals from a given list of fixtures
function totalsFrom(fixtureList, voltage) {
  let totAppPower = 0,
    weight = 0,
    current = 0;
  if (fixtureList) {
    fixtureList.forEach((fixture) => {
      if (fixture.quantity >= 1) {
        if (fixture.apparentPower) {
          totAppPower +=
            Number(fixture.apparentPower) * Number(fixture.quantity);
        } else if (fixture.powerFactor && fixture.realPower) {
          totAppPower +=
            (Number(fixture.realPower) / Number(fixture.powerFactor)) *
            Number(fixture.quantity);
        } else {
          totAppPower += Number(fixture.realPower) * Number(fixture.quantity);
        }
        weight += Number(fixture.weight) * Number(fixture.quantity);
      }
    });
  }
  current = totAppPower / voltage;
  return { power: totAppPower, weight: weight, current: current };
}

export { printPower, getObj, matchAgainst, totalsFrom };
