import React from "react";
import { fireEvent, render } from "@testing-library/react";
import PersonInfo from "./PersonInfo";

describe("PersonInfo component", () => {
  const mockData = {
    firstNameLastName: "John Smith",
    jobTitle: "Software Engineer",
    emailAddress: "john.smith@example.com",
  };

  it("should render person's information", () => {
    const { getByText } = render(
      <PersonInfo
        data={mockData}
        selected={false}
        triggerSelectedState={() => {}}
      />
    );

    expect(getByText(mockData.firstNameLastName)).toBeInTheDocument();
    expect(getByText(mockData.jobTitle)).toBeInTheDocument();
    expect(getByText(mockData.emailAddress)).toBeInTheDocument();
  });

  it("should trigger the selected state on click", () => {
    const mockTriggerSelectedState = jest.fn();
    const { getByTestId } = render(
      <PersonInfo
        data={mockData}
        selected={false}
        triggerSelectedState={mockTriggerSelectedState}
      />
    );

    fireEvent.click(getByTestId("person-info"));

    expect(mockTriggerSelectedState).toHaveBeenCalled();
  });

  it("should have selected class if selected prop is true", () => {
    const { container } = render(
      <PersonInfo
        data={mockData}
        selected={true}
        triggerSelectedState={() => {}}
      />
    );

    expect(container.firstChild).toHaveClass("selected-person");
  });

  it("should not have selected class if selected prop is false", () => {
    const { container } = render(
      <PersonInfo
        data={mockData}
        selected={false}
        triggerSelectedState={() => {}}
      />
    );

    expect(container.firstChild).not.toHaveClass("selected-person");
  });
});
