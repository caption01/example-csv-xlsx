const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");
const util = require("util");
const { map, forEach } = require("lodash");

const { templateColumns } = require("./utility/config");
const { transformDataToSheetData } = require("./utility/transform");

const readdir = util.promisify(fs.readdir);
const sourcePath = path.join(__dirname, "../source");
const outPath = path.join(__dirname, "../out");

const createWorkSheet = (rawData = {}) => {
  const data = {
    columnKey: templateColumns,
    info: rawData,
  };

  const sheetData = transformDataToSheetData(data);

  const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

  return worksheet;
};

const processExcel = async (file) => {
  console.log("process", file);
  const workSheetName = "test-result";
  const workBook = XLSX.utils.book_new();
  const workSheet = createWorkSheet();

  await XLSX.utils.book_append_sheet(workBook, workSheet, workSheetName);
  await XLSX.writeFile(workBook, `${outPath}/generated-${file}.csv`);
  console.log("done", file);
};

const startWriteCSV = async () => {
  let filesList = [];

  try {
    filesList = await readdir(sourcePath);
    await forEach(filesList, async (file) => await processExcel(file));
  } catch (err) {
    console.log("can not process", err.message);
  }
};

startWriteCSV();
