export const textValidator = (text) => {
  const symbols = [
    "`",
    "~",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "-",
    "_",
    "+",
    "=",
    "/",
    "[",
    "]",
    "{",
    "}",
    "|",
    "'",
    `"`,
    ".",
    "?",
  ];
  const contains = symbols.some((symbol) => text?.includes(symbol));
  return contains;
};
