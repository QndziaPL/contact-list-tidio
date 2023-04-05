import React from "react";
import classNames from "classnames";

type Props = {
  data: {
    firstNameLastName: string;
    jobTitle: string;
    emailAddress: string;
  };
  selected: boolean;
  triggerSelectedState: () => void;
};

function PersonInfo(props: Props) {
  const { data, selected, triggerSelectedState } = props;
  return (
    <div
      className={classNames("person-info", {
        ["selected-person"]: selected,
      })}
      onClick={triggerSelectedState}
    >
      <div className="firstNameLastName">{data.firstNameLastName}</div>
      <div className="jobTitle">{data.jobTitle}</div>
      <div className="emailAddress">{data.emailAddress}</div>
    </div>
  );
}

export default PersonInfo;
