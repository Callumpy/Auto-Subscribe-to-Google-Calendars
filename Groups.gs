/**
 * Returns an array containing all member email addresses in a Google Group.
 * @param {string} groupEmail Email address of a Google Group.
 * @return {Array} membersEmails Returns an array containing all member email addresses in a Google Group.
 */
 function getUserEmailsInGroup(groupEmail) {
    try {
      var pageToken
      var membersEmails = []
  
      do {
        var groupMembers = AdminDirectory.Members.list(groupEmail, {pageToken: pageToken})
        pageToken = groupMembers.nextPageToken
  
        groupMembers.members.forEach(function(i) {
          membersEmails.push(i.email)
        })
      } while(pageToken)
      
    } catch(e) {
      Logger.log("getUserEmailsInGroup: No Group ID with this name: " + e)
    }
  
    return membersEmails
  }