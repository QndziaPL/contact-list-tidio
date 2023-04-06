export const getFirstLettersOfTwoNames = (fullName: string) => {
  const [first, second] = fullName.split(" ");
  return `${first[0]}${second[0]}`;
};
