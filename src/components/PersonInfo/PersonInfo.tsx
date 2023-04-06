import React, { forwardRef } from "react";
import classNames from "classnames";
import { IContact } from "../../api/api";
import { getFirstLettersOfTwoNames } from "./helpers";

export interface IPersonInfoProps {
  data: Omit<IContact, "id">;
  selected: boolean;
  triggerSelectedState: () => void;
}

const PersonInfo = forwardRef<HTMLDivElement, IPersonInfoProps>(
  (
    {
      triggerSelectedState,
      selected,
      data: { emailAddress, firstNameLastName, jobTitle },
    },
    ref
  ) => (
    <div
      ref={ref}
      className={classNames("person-info", {
        "selected-person": selected,
      })}
      onClick={triggerSelectedState}
    >
      <div className="topContainer">
        <div className="initialsInCircle">
          {getFirstLettersOfTwoNames(firstNameLastName)}
        </div>
        <div className="nameAndJobTitleContainer">
          <div className="firstNameLastName">{firstNameLastName}</div>
          <div className="jobTitle">{jobTitle}</div>
        </div>
      </div>
      <div className="emailAddress">{emailAddress}</div>
    </div>
  )
);

export default PersonInfo;
