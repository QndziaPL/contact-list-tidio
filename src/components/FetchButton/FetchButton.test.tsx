import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { FetchButton, IFetchStateButtonProps } from "./FetchButton";

describe("FetchButton", () => {
  const mockFetchData = jest.fn();

  const props: IFetchStateButtonProps = {
    state: {
      state: "fetched",
    },
    fetchData: mockFetchData,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component with the correct content when "fetched" state is passed', () => {
    const { getByText } = render(<FetchButton {...props} />);

    expect(getByText("Load more")).toBeInTheDocument();
  });

  it('should render the component with the correct content when "loading" state is passed', () => {
    const { getByTestId } = render(
      <FetchButton
        state={{
          state: "loading",
        }}
        fetchData={mockFetchData}
      />
    );

    expect(getByTestId("loader")).toBeInTheDocument();
  });

  it('should render the component with the correct content when "error" state is passed', () => {
    const { getByText } = render(
      <FetchButton
        state={{
          state: "error",
          error: "Something went wrong",
        }}
        fetchData={mockFetchData}
      />
    );

    expect(getByText("Something went wrong, try again")).toBeInTheDocument();
  });

  it('should call the "fetchData" function when the button is clicked', () => {
    const { getByRole } = render(<FetchButton {...props} />);
    const button = getByRole("button");

    fireEvent.click(button);

    expect(mockFetchData).toHaveBeenCalled();
  });

  it('should disable the button when "loading" state is passed', () => {
    const { getByRole } = render(
      <FetchButton
        state={{
          state: "loading",
        }}
        fetchData={mockFetchData}
      />
    );
    const button = getByRole("button");

    expect(button).toBeDisabled();
  });
});
