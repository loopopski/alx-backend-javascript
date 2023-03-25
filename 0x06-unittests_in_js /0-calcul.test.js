const assert = require("assert");
const calculateNumber = require("./0-calcul")


describe("calculateNumber", function() {
  it("checks sum of rounded numbers", function() {
    const test1 = calculateNumber(1, 3);
    assert.equal(test1, 4);
  });
  it("checks sum of mixed numbers", function() {
    const test1 = calculateNumber(1, 3.7);
    assert.equal(test1, 5);
  });
  it("checks sum of float numbers", function() {
    const test1 = calculateNumber(1.2, 3.7);
    assert.equal(test1, 5);
  });
  it("checks sum of float numbers", function() {
    const test1 = calculateNumber(1.5, 3.7);
    assert.equal(test1, 6);
  });
  it("checks sum of mixed sign float numbers", function() {
    const test1 = calculateNumber(-1.2, 3.7);
    assert.equal(test1, 3);
  });
  it("checks sum of negative float numbers", function() {
    const test1 = calculateNumber(-1.5, -3.7);
    assert.equal(test1, -5);
  });
});
