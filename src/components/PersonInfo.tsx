import React, { forwardRef } from "react";
import classNames from "classnames";
import { IContact } from "../api/api";

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
      <div className="firstNameLastName">{firstNameLastName}</div>
      <div className="jobTitle">{jobTitle}</div>
      <div className="emailAddress">{emailAddress}</div>
    </div>
  )
);

export default PersonInfo;
