import * as csv from "fast-csv";
import * as fs from "fs";

interface CSVFile {
  COLUMN: string;
  TITLE: string;
  ESTIMATIVE: number;
}

fs.createReadStream("src/cards.csv")
  .pipe(csv.parse({ headers: true }))
  .on("error", (error) => console.error(error))
  .on("data", (row: CSVFile) => console.log(row.COLUMN))
  .on("end", (rowCount: number) => console.log(`Parsed ${rowCount} rows`));
