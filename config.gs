function getConfig() {
    return {
      "private_key": "",
      "service_account": "....iam.gserviceaccount.com",
      
      "groups": {
        "group-1@test.com": {
          "calendar-1@group.calendar.google.com": {
            "calendarName": "Company Wide Events",
            "eventColor": "#000000",
            "textColor": "#ffffff",
            "hidden": false,
            "selected": true,
          },
          "calendar-2@group.calendar.google.com": {
            "calendarName": "IT Team Calendar",
            "eventColor": "#000000",
            "textColor": "#ffffff",
            "hidden": false,
            "selected": true,
          }
        },
        "group-2@test.com": {
            "calendar-3@group.calendar.google.com": {
                "calendarName": "Finance Team Calendar",
                "eventColor": "#000000",
                "textColor": "#ffffff",
                "hidden": false,
                "selected": true,
                }
            },
        },
    }
}