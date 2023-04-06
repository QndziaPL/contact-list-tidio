import { act, fireEvent, render, waitFor } from "@testing-library/react";
import apiData, { IContact } from "../../api/api";
import App from "./App";
import mockDataJson from "../../mocks/mockData.json";

jest.mock("../../api/api");

describe("App component", () => {
  const mockedApiData = apiData as jest.MockedFunction<typeof apiData>;

  const mockData: IContact[] = mockDataJson.slice(0, 2);

  beforeEach(() => {
    mockedApiData.mockClear();
    mockedApiData.mockResolvedValue(mockData);
  });

  it("should render App component", async () => {
    const { getByText, getAllByTestId } = render(<App />);

    expect(getByText("Selected contacts: 0")).toBeInTheDocument();

    await waitFor(() => {
      expect(getAllByTestId("person-info").length).toBe(2);
    });
  });

  it("should display correct amount of selected contacts", async () => {
    const { getByText, getAllByTestId } = render(<App />);

    await waitFor(() => {
      expect(getAllByTestId("person-info").length).toBe(2);
    });

    act(() => {
      fireEvent.click(getAllByTestId("person-info")[0]);
    });

    expect(getByText("Selected contacts: 1")).toBeInTheDocument();
  });

  it("should fetch data from apiData on component mount", async () => {
    render(<App />);

    await waitFor(() => {
      expect(mockedApiData).toHaveBeenCalledTimes(1);
    });
  });

  it("should display loading state while fetching data", async () => {
    const { getByText, getByTestId } = render(<App />);

    expect(getByTestId("loader")).toBeInTheDocument();

    await waitFor(() => {
      expect(mockedApiData).toHaveBeenCalledTimes(1);
    });

    expect(getByText("Selected contacts: 0")).toBeInTheDocument();
  });

  it("should display error state when apiData fails", async () => {
    const errorMessage = "Test error message";
    mockedApiData.mockRejectedValue(new Error(errorMessage));

    const { getByText, getByTestId } = render(<App />);

    expect(getByTestId("loader")).toBeInTheDocument();

    await waitFor(() => {
      expect(mockedApiData).toHaveBeenCalledTimes(1);
    });

    expect(getByText(/Test error message/)).toBeInTheDocument();
  });
});
