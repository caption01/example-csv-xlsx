const { map, mapValues } = require("lodash");

const transformDataToSheetData = (data = {}) => {
  let sheet = [];
  const { tempateCols, info } = data;

  const firstRow = map(tempateCols, (colKey) => {
    return colKey;
  });

  const otherRows = map(info, (row) => {
    return map(tempateCols, (colKey) => {
      return row[colKey] ? row[colKey] : "";
    });
  });

  sheet = [firstRow, ...otherRows];

  return sheet;
};

module.exports = {
  transformDataToSheetData,
};
