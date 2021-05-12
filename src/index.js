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

    // console.log(workbook, filesList)

    const sheetName = workbook.SheetNames[0];
    const workSheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(workSheet);

    // console.log(jsonData)


    const mapData = map(jsonData, (d) => {
      // console.log(d)
      return {
        Failed_count: ``,
        id: `${d.id}`,
        gender: `${d.gender}`,
        age_inyear: `${d.age_inyear}`,
        age_inmonth: `${d.age_inmonth}`,
        hirate: `${d.hirate}`,
        occuclass: `${d.occuclass}`,
        paOccuclass: `${d.paOccuclass}`,
        BasicPlan: `${d.BasicPlan}`,
        Basic_SumAssured: `${d.Basic_SumAssured}`,
        Basic_Premium: ``,
        Payer_Gender: ``,
        Payer_age_inyear:`${d.age_inyear}`,
        Payer_age_inmonth:`${d.age_inmonth}`,
        Payer_Type:``,
        PaymentMode: ``,
        Channel: ``,
        productGroup: ``,
        ridersSumassured: `${d['riders:Sumassured']}`,
        code_result: ``,
        code_actual: ``,
        code_expected: `${d.code_expected}`
      }

    });

    // add edit data
    XLSX.utils.sheet_add_json(workSheet, mapData);

    XLSX.writeFile(workbook, `${outPath}/test-case.csv`);
  } catch (err) {
    console.log({ err });
  }
};

readFiles();
