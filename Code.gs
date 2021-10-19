function addCalendarToGroupMembers() {
    let config = getConfig()
    let groups = config.groups
  
    // Iterate over each group in the config file.
    for (const [group, calendars] of Object.entries(groups)) {
  
      // Get an array of all members in the group.
      let members = getUserEmailsInGroup(group)
      Logger.log("Members in group " + group + ": " + members)
  
      // Iterate over each calendar ID assigned to the group in config.
      for (const [calendarId, calendarDetails] of Object.entries(calendars)) {
        Logger.log("Working on calendar: " + calendarDetails.calendarName)
  
        // Get a list of all users that have been added to this calendar previously.
        // Do this to avoid authenticating as the same users over and over again.
        // Also allows users to unsub if they wish without as adding it back again.
        let alreadyMembers = getUsersFromDatabase(calendarId)
  
        // Auth using OAuth2 for each member in the group and subscribe to the specific calendar.
        members.forEach(function(member) {
          if (!alreadyMembers.includes(member)) {
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
  
              Logger.log("Adding " + member + " to database")
              addUserToDatabase(calendarId ,member)
  
            } catch (e) {
              Logger.log(e)
            }
          } else {
            Logger.log("Member already has been subscribed: " + member)
          }
        })
      }
    }
  }