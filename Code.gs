function run() {
    let config = getConfig()
    let groups = config.groups
  
    // Iterate over each group in the config file
    for (const [group, calendars] of Object.entries(groups)) {
  
      // Get an array of all members in the group
      let members = getUserEmailsInGroup(group)
      Logger.log("Members in group " + group + ": " + members)
  
      // Iterate over each calendar ID assigned to the group in config
      for (const [calendarId, calendarDetails] of Object.entries(calendars)) {
        Logger.log("Working on calendar: " + calendarDetails.calendarName)
  
        // Auth using OAuth2 for each member in the group and subscribe to the specific calendar
        members.forEach(function(member) {
          let service = getService(member);
  
          if (!service.hasAccess()) {
            Logger.log("Can't delegate access for member: " + member)
            return
          }
  
          try {
            subscribeToCalendar(
              service.getAccessToken(), 
              calendarId, 
              calendarDetails.eventColor, 
              calendarDetails.textColor, 
              calendarDetails.hidden, 
              calendarDetails.selected,
              member
            )
  
            Logger.log("Subscribing to " + calendarDetails.calendarName + " calendar for user: " + member)
  
          } catch (e) {
            Logger.log(e)
          }
        })
      }
    }
  }