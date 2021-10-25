const BASE_URL = "https://www.googleapis.com"

/**
 * Create an OAuth2 service with an impersonated user to get access token.
 * @param {string} userImpersonating Email address of the user in your domain to impersonate.
 * @return {Object} Returns an OAuth2 object which can be used for authenticating to a service via access token.
 */
function getService(userImpersonating) {
  var privateKey = getConfig().private_key;
  var serviceAccountEmail = getConfig().service_account;
  
  return OAuth2.createService('GoogleCalendar:' + userImpersonating)
      .setTokenUrl('https://oauth2.googleapis.com/token')
      .setPrivateKey(privateKey)
      .setIssuer(serviceAccountEmail)
      .setSubject(userImpersonating)
      .setScope(BASE_URL + '/auth/calendar');
}

/**
 * Subscribe to a Google Calendar whilst impersonating the end-user.
 * @param {string} accessToken OAuth2 access token needed to impersonate the user.
 * @param {string} calendarId Calendar ID to subscribe to.
 * @param {string} bgColor Background colour of the event tile in Calendar view.
 * @param {string} fgColor Text colour of the event tile in Calendar view.
 * @param {boolean} hidden Is the calendar hidden in the user's view.
 * @param {boolean} selected Is the calendar selected in the user's view.
 * @param {string} user Email address of the impersonated user, only for erroring.
 * @return {Object} Returns content sent back from Google API when subscribing to a calendar, or throws an exception if the calendar service is disabled for a user.
 */
function subscribeToCalendar(accessToken, calendarId, bgColor, fgColor, hidden, selected, user) {
  let url = BASE_URL + '/calendar/v3/users/me/calendarList?colorRgbFormat=true';
  let options = {
    'method': 'POST',
    'payload': JSON.stringify({
      'id': calendarId,
      'backgroundColor': bgColor,
      'foregroundColor': fgColor,
      'hidden': hidden,
      'selected': selected,
    }),
    'muteHttpExceptions': false,
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  }

  try {
    let response = UrlFetchApp.fetch(url, options);
    return JSON.parse(response.getContentText());
  } catch {
    throw new Error("Calendar not enabled for user: " + user)
  }
}