import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

/*
Commented out default test due to but in React <16.9. The big
red warning is very distracting for the workshop.
Bug documented here:
https://github.com/testing-library/react-testing-library/issues/281
*/

// it("renders without crashing", () => {
//   const div = document.createElement("div");
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

function sum(a, b) {
  if (typeof a === "number" && typeof b === "number") {
    return a + b;
  }
  throw new Error("cat");
}

describe("sum", () => {
  it("should add 2 numbers and return the sum", () => {
    expect(sum(2, 3)).toEqual(5);
  });

  it("should add 2 negative numbers", () => {
    expect(sum(-2, -3)).toEqual(-5);
  });

  it("should throw when the inputs are invalids", () => {
    // expect(sum(-2, "fish")).toThrowError();
    // Must use an anonymous function to test the above.
    // expect(() => sum(-2, "fish")).toThrowError(); // this is the syntax for to throw error.
  });
});
