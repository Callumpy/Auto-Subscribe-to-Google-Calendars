const SHEET_ID = getConfig().sheetId

function getUsersFromDatabase(calendarId) {
  let database = objDB.open(SHEET_ID);
  let rows = objDB.getRows(database, calendarId);
  let membersArray = []

  rows.forEach(function(i) {
    membersArray.push(i.Members)
  })

  return membersArray
}

function addUserToDatabase(calendarId, member) {
  let database = objDB.open(SHEET_ID);
  objDB.insertRow(database, calendarId, {"Members": member})
}