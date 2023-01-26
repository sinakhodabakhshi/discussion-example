

export const nameIcon = (name) => {
  const words = name.split(" ");
  const firsrName = words[0].charAt();
  const lastname = words[1] ? words[1].charAt() : "";
  return firsrName.toUpperCase() + lastname.toUpperCase();
};