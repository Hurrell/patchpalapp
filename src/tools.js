const DEFAULTPFDISCHARGE = 0.96;
const DEFAULTPFLED = 0.96;
const DEFAULTPFLEDSTROBE = 0.96;

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
    unit: "",
  };
  if (power > 1000) {
    visualPower = {
      number: (power / 1000).toFixed(1),
      unit: "k",
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

//Function to return powers and estimated powers from a fixture
function powersFrom(fixture) {
  let apparentPower, apparentPowerEstimated, realPower, realPowerEstimated;

  if (fixture.apparentPower) {
    apparentPower = fixture.apparentPower;
  } else if (fixture.realPower && fixture.powerFactor) {
    apparentPower = fixture.realPower / fixture.powerFactor;
  } else if (fixture.realPower) {
    switch (fixture.lampType) {
      case "LED":
        apparentPower = fixture.realPower / DEFAULTPFLED;
        apparentPowerEstimated = true;
        break;
      case "Discharge":
        apparentPower = fixture.realPower / DEFAULTPFDISCHARGE;
        apparentPowerEstimated = true;
        break;
      case "Conventional":
        apparentPower = fixture.realPower;
        break;
      case "LED-Strobe":
        apparentPower = fixture.realPower / DEFAULTPFLEDSTROBE;
        apparentPowerEstimated = true;
        break;
      default:
        apparentPower = fixture.realPower;
        apparentPowerEstimated = true;
    }
  }

  if (fixture.realPower) {
    realPower = fixture.realPower;
  } else if (fixture.apparentPower && fixture.powerFactor) {
    apparentPower = fixture.apparentPower * fixture.powerFactor;
  } else if (fixture.apparentPower) {
    realPower = fixture.apparentPower;
    realPowerEstimated = true;
  }

  return {
    apparentPower,
    apparentPowerEstimated,
    realPower,
    realPowerEstimated,
  };
}

//Function to return totals from a given list of fixtures
function totalsFrom(fixtureList, voltage) {
  let totAppPower = 0,
    weight = 0,
    current = 0;
  if (fixtureList) {
    fixtureList.forEach((fixture) => {
      if (fixture.quantity >= 1) {
        if (powersFrom(fixture).apparentPower) {
          totAppPower +=
            Number(powersFrom(fixture).apparentPower) *
            Number(fixture.quantity);
        }
        // if (fixture.apparentPower) {
        //   totAppPower +=
        //     Number(fixture.apparentPower) * Number(fixture.quantity);
        // } else if (fixture.powerFactor && fixture.realPower) {
        //   totAppPower +=
        //     (Number(fixture.realPower) / Number(fixture.powerFactor)) *
        //     Number(fixture.quantity);
        // } else {
        //   totAppPower += Number(fixture.realPower) * Number(fixture.quantity);
        // }
        weight += Number(fixture.weight) * Number(fixture.quantity);
      }
    });
  }
  current = totAppPower / voltage;
  return { power: totAppPower, weight: weight, current: current };
}

export { printPower, getObj, matchAgainst, totalsFrom, powersFrom };
