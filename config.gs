const SCRIPT_PROPERTIES = PropertiesService.getScriptProperties();

function getConfig() {
    return {
    "private_key": SCRIPT_PROPERTIES.getProperty("PRIVATE_KEY"),
    "service_account": SCRIPT_PROPERTIES.getProperty("SERVICE_ACCOUNT"),
      
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

function setKeys() {
    SCRIPT_PROPERTIES.setProperty('PRIVATE_KEY', '-----BEGIN PRIVATE KEY-----\n\n-----END PRIVATE KEY-----\n');
    SCRIPT_PROPERTIES.setProperty('SERVICE_ACCOUNT', '');
}