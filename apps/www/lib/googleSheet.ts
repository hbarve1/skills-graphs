import { google } from 'googleapis';

const sheets = google.sheets({
  version: 'v4',
  auth: process.env.GOOGLE_CLOUD_API_KEY,
});

export async function getDataFromGoogleSheet() {
  // const doc = new GoogleSpreadsheet(process.env.SHEET_ID);
  // await doc.useServiceAccountAuth({
  //   client_email: process.env.CLIENT_EMAIL,
  //   private_key: process.env.PRIVATE_KEY,
  // });
  // await doc.loadInfo();
  // const sheet = doc.sheetsByIndex[0];
  // const rows = await sheet.getRows();
  // return rows;

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: process.env.GOOGLE_SHEET_RANGE,
  });

  // console.table(res.data.values);
  // console.dir(res.data.values, { depth: null });

  const { skills, categories } = res.data.values.reduce(
    (
      prev,
      [skill, confidance, field, years, categoryShortHand, categoryFullName],
      idx
    ) => {
      const skillObj = { ...prev };
      if (idx === 0) {
        return skillObj;
      }

      if (categoryShortHand) {
        skillObj.categories[categoryShortHand] = categoryFullName;
      }
      if (skill) {
        skillObj.skills.push({
          skill,
          confidance: Number(confidance),
          years: Number(years),
          field: field?.split(',').map((f) => f.trim()),
        });
      }

      return skillObj;
    },
    { skills: [], categories: {} }
  );

  // console.dir({ skills, categories }, { depth: null });

  return { skills, categories };
}
