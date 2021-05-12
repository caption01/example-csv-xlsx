const { map, mapValues } = require("lodash");

const transformDataToSheetData = (data = {}) => {
  let sheet = [];

  const firstRow = map(data?.columnKey, (colKey) => {
    return colKey;
  });
  // const otherRows = data?.info;
  sheet = [firstRow];

  return sheet;
};

module.exports = {
  transformDataToSheetData,
};
