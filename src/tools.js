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

//function to get total power draw from selected fixtures
function powerDraw(selectedFixtures) {
  let power = 0;
  if (selectedFixtures) {
    selectedFixtures.forEach((fixture) => {
      if (fixture.quantity >= 1) {
        power += Number(fixture.power) * Number(fixture.quantity);
      }
    });
  }
  return power;
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

export { printPower, powerDraw, getObj, matchAgainst };
