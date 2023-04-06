import React, { FC, useMemo } from "react";
import classNames from "classnames";
import { Loader } from "../Loader/Loader";

export interface IFetchState {
  state: "error" | "loading" | "fetched";
  error?: string;
  newId?: string;
}

export interface IFetchStateButtonProps {
  state: IFetchState;
  fetchData: () => void;
}

export const FetchButton: FC<IFetchStateButtonProps> = ({
  state: { state, error },
  fetchData,
}) => {
  const content = useMemo(() => {
    switch (state) {
      case "fetched":
        return "Load more";
      case "loading":
        return <Loader content="Loading data" animationSpeed={100} />;
      case "error":
        return `${error}, try again`;
      default:
        return <></>;
    }
  }, [state, error]);

  return (
    <button
      disabled={state === "loading"}
      onClick={fetchData}
      className={classNames("fetch-state-button", {
        "fetch-error-background": state === "error",
        "fetch-loading-background": state === "loading",
      })}
    >
      {content}
    </button>
  );
};
