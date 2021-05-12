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
        result: ``,
        failCount: ``,
        id: `${d.id}`,
        gender: `${d.gender}`,
        ageInYear: `${d.age_inyear}`,
        ageInMonth: `${d.age_inmonth}`,
        hiRate: `${d.hirate}`,
        occuClass: `${d.occuclass}`,
        paOccuClass: `${d.paOccuclass}`,
        basicPlan: `${d.BasicPlan}`,
        basicSumAssured: `${d.Basic_SumAssured}`,
        basicPremium: ``,
        payerGender: ``,
        payerAgeInyear:`${d.age_inyear}`,
        payerAgeInmonth:`${d.age_inmonth}`,
        payerType:``,
        paymentMode: ``,
        channel: ``,
        productGroup: ``,
        ridersSumassured: `${d['riders:Sumassured']}`,
        codeResult: ``,
        codeActual: ``,
        codeExpected: `${d.code_expected}`
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
