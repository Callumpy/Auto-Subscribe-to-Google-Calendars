const SHEET_ID = getConfig().sheetId

function getUsersFromDatabase(calendarId, database) {
  let rows = objDB.getRows(database, calendarId);
  let membersArray = []

  rows.forEach(function(i) {
    membersArray.push(i.Members)
  })

  return membersArray
}

function addUserToDatabase(calendarId, member, database) {
  objDB.insertRow(database, calendarId, {"Members": member})
}

function openDatabaseConnection() {
  return objDB.open(SHEET_ID);
}