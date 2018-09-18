contract("TestContract", () => {
  before("before", () => console.log("before"));
  beforeEach("beforeEach", () => console.log("beforeEach"));
  afterEach("afterEach", () => console.log("afterEach"));

  describe("Test Case 1", () => {
    it("Test Case 1 - test 1", () => console.log("Test Case 1 - test 1"));
    it("Test Case 1 - test 2", () => console.log("Test Case 1 - test 2"));
  });

  describe("Test Case 2", () => {
    it("Test Case 2 - test 1", () => console.log("Test Case 2 - test 1"));
    it("Test Case 2 - test 2", () => console.log("Test Case 2 - test 2"));
  });

  after("after", () => console.log("after"));
});
