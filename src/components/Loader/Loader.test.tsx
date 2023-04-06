import React from "react";
import { act, cleanup, render } from "@testing-library/react";
import { Loader } from "./Loader";

describe("Loader", () => {
  afterEach(cleanup);

  it("renders loader correctly", () => {
    const { getByTestId } = render(
      <Loader content="Loading" animationSpeed={500} />
    );
    expect(getByTestId("loader")).toBeTruthy();
  });

  jest.useFakeTimers();

  it("renders letters with different colors", () => {
    const animationSpeed = 100;
    const content = "Testing";

    const { container } = render(
      <Loader animationSpeed={animationSpeed} content={content} />
    );

    const letters = container.querySelectorAll("span");
    expect(letters.length).toBe(content.length);

    expect(letters[0].style.color).toBe("red");

    act(() => {
      jest.advanceTimersByTime(animationSpeed);
    });

    expect(letters[0].style.color).toBe("black");
    expect(letters[1].style.color).toBe("red");
  });
});
