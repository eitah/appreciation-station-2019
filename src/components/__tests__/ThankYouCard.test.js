import React from "react";
import { shallow } from "enzyme";
import ThankYouCard from "../ThankYouCard";

let testMember = {
  name: "Test mentor",
  isMentor: true
};

let testMessage = {
  text: "Thank you for being a great mentor, {NAME}!",
  isMentor: true
};

let testBgdImage = {
  file: {
    url: "testUrl"
  },
  maxTextWidth: 0.75,
  textPosition: "topLeft"
};

let subject;
let renderPrevArrow = jest.fn();
let renderNextArrow = jest.fn();

describe("thank you card", () => {
  describe("render", () => {
    it("should match the snapshot", () => {
      subject = shallow(
        <ThankYouCard
          {...{
            member: testMember,
            message: testMessage,
            backgroundImage: testBgdImage,
            prevArrow: renderPrevArrow,
            nextArrow: renderNextArrow
          }}
        />
      );
      expect(subject).toMatchSnapshot();
    });
  });

  // hash is an instance method, vs class level vs
  describe("#setCavasSize", () => {
    it("should updates width and hegiht", () => {
      // arrange
      let canvas = {};
      const width = 200;
      const height = 300;

      // act
      // instance lets you access intance methods
      subject.instance().setCanvasSize(canvas, width, height);

      //assert
      expect(canvas.width).toEqual(width);
      expect(canvas.height).toEqual(height);
    });
  });
});
