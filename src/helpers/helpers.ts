import { IContact } from "../api/api";

export type ISortResult = 1 | -1 | 0;
export type SortDataBasedOnSelectedFunctionType = (
  contact1: IContact,
  contact2: IContact,
  selectedContacts: string[]
) => ISortResult;

export const sortDataBasedOnSelected: SortDataBasedOnSelectedFunctionType = (
  contact1,
  contact2,
  selectedContacts
) => {
  const contact1Selected = selectedContacts.includes(contact1.id);
  const contact2Selected = selectedContacts.includes(contact2.id);

  if (
    (contact1Selected && contact2Selected) ||
    (!contact1Selected && !contact2Selected)
  )
    return 0;

  return contact1Selected ? -1 : 1;
};

export type SortDataBasedOnIdFunctionType = (
  contact1: IContact,
  contact2: IContact
) => ISortResult;

export const sortDataBasedOnId: SortDataBasedOnIdFunctionType = (
  contact1,
  contact2
) => (Number(contact1.id) > Number(contact2.id) ? 1 : -1);

export const getListContainerScrollValue = (
  personInfoRef: HTMLDivElement | null
) => {
  const y = personInfoRef?.getBoundingClientRect().y ?? 0;
  const offsetTop = personInfoRef?.offsetTop ?? 0;
  return Math.abs(y - offsetTop);
};
