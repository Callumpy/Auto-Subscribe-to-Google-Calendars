# Auto Subscribe to Google Calendars
Automatically subscribe end-users from a Google Group to a Group/Shared Calendar, using Google AppsScript and a service account for delegated admin access. 

- The calendar will appear in the user's Calendar UI automatically, no need to ask end-users to manually add calendars.
- The script takes a list of members from a specified Google Group, and adds all those members to a specified Calendar ID.
- This doesn't add users to the calendar's ACL, the calenader must have been made available to the user in advance (mostly through being visable to your entire organisation).
- It can only subscribe users that belong to your domain, delegated admin access to the end-user is required.

# Dependencies 
- AdminDirectory API
- [OAuth2 Library](https://github.com/googleworkspace/apps-script-oauth2)
- [ObjDB Library](https://googlescripts.harryonline.net/objdb)
- Must have a Google Sheet linked with tabs referring to each Calendar ID
- A Google Workspace Super Administrator is required to set-up the domain-wide delegation

**Required Scopes:**

`https://www.googleapis.com/auth/calendar`
`https://www.googleapis.com/auth/admin.directory.group.readonly`

# Installation/Usage
1. Copy the script files from the repo into a new script. ([script.google.com](https://script.google.com))
2. [Create a GCP Project](https://cloud.google.com/resource-manager/docs/creating-managing-projects) and enable the **Calendar API** and **Admin SDK** from the [Marketplace](https://console.cloud.google.com/marketplace). - Ensure that you have enabled the OAuth consent screen. 
3. [Create a GCP Service Account](https://console.cloud.google.com/iam-admin/serviceaccounts) and create a private key to be used in the script.
4. After creating the service account, ensure that you have enabled Google Workspace [domain-wide delegataion](https://developers.google.com/admin-sdk/directory/v1/guides/delegation) in it's details section. 
5. Add the GCP Project ID and required scopes from above into Google Workspace for domain-wide delegation, [on this page](https://admin.google.com/ac/owl/domainwidedelegation).
6. In your new AppsScript's settings, click to link a GCP project at the bottom and enter the same Project ID from above.
7. Add the required 2 libraries and AdminDirectory service to your script editor.
8. In `config.gs`, first use the `setKeys()` function to store your service account's private key and email address in the script properties. One you've ran the function once, you can remove the keys so they're no longer visible in plain text. 
9. Also in `config.gs`, Setup your Groups and Calendar IDs that will be managed by the script. See the example in the repo.
10. [Create a trigger](https://developers.google.com/apps-script/guides/triggers/installable) to run the script on your own schedule.