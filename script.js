const SHEET_ID = "1lM4SmYc6huI1cgXt5tNndTG28CFx4A14CZQFIABOZOM";

function doPost(e) {

  try {

    const data = JSON.parse(e.postData.contents);

    const spreadsheet =
      SpreadsheetApp.openById(SHEET_ID);

    const sheet =
      spreadsheet.getSheets()[0];

    sheet.appendRow([
      new Date(),
      data.presence || "",
      data.nom || "",
      data.compagnie || "",
      data.enfants || "",
      data.menu || "",
      data.restrictions || "",
      data.hebergement || "",
      data.message || ""
    ]);

    return ContentService
      .createTextOutput(
        JSON.stringify({
          success: true
        })
      )
      .setMimeType(
        ContentService.MimeType.JSON
      );

  } catch (error) {

    console.error(error);

    return ContentService
      .createTextOutput(
        JSON.stringify({
          success: false,
          error: error.toString()
        })
      )
      .setMimeType(
        ContentService.MimeType.JSON
      );
  }
}
