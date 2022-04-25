const { wait } = require("@testing-library/react");

describe("this is the first set of tests", () => {
  it("runs a test", async () => {
    console.log(1);
    await new Promise((resolve) => setTimeout(resolve, 3000)); // 3 sec
    console.log(2);

    expect(true);

    expect(true);
  });
});
