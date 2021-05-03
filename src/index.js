const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");
const util = require("util");
const { map } = require("lodash");

const readdir = util.promisify(fs.readdir);

const readFiles = async () => {
  let filesList;
  const sourcePath = path.join(__dirname, "../source");
  const outPath = path.join(__dirname, "../out");

  try {
    filesList = await readdir(sourcePath);
    const workbook = XLSX.readFile(`${sourcePath}/${filesList[0]}`);

    const sheetName = workbook.SheetNames[0];
    const workSheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(workSheet);

    const mapData = map(jsonData, (d) => ({
      ...d,
      gender: `${d.gender}/X`,
    }));

    // add edit data
    XLSX.utils.sheet_add_json(workSheet, mapData);

    XLSX.writeFile(workbook, `${outPath}/test-case.csv`);
  } catch (err) {
    console.log({ err });
  }
};

readFiles();
