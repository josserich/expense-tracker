const capitalizeWord = (str) => {
  if (!str) {
    return "";
  } else {
    const capitalize = str
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
    return capitalize.trim();
  }
};

export default capitalizeWord;
