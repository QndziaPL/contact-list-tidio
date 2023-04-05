import React, { FC, useMemo } from "react";
import classNames from "classnames";
import { SingleLetterWithColor } from "./loader/SingleLetterWithColor";

export type FetchState = "error" | "loading" | "fetched";
export interface FetchStateButtonProps {
  state: FetchState;
  fetchData: () => void;
}
export const FetchStateButton: FC<FetchStateButtonProps> = ({
  state,
  fetchData,
}) => {
  const content = useMemo(() => {
    switch (state) {
      case "fetched":
        return "Load more";
      case "loading":
        return (
          <SingleLetterWithColor
            content="Loading data"
            animationSpeed={100}
            baseColor="#000000"
          />
        );
      case "error":
        return "Error, try again";
      default:
        return <></>;
    }
  }, [state]);

  return (
    <button
      disabled={state === "loading"}
      onClick={fetchData}
      className={classNames("fetch-state-button", {
        ["fetch-error-background"]: state === "error",
        ["fetch-loading-background"]: state === "loading",
      })}
    >
      {content}
    </button>
  );
};
