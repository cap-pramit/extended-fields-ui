# Introduction

This boilerplate has been created to be used while creating new Capillary UI projects that use React. This boilerplate is the successor to the older `cap-react-starter` which used the `container/component` model. This new boilerplate is based on the principles of `atomic-design`.

# What's Included
With this boilerplate, we get the basic features working with one single functional route: [/product/dashboard](http://localhost:8000/product/dashboard). The route makes an API call to fetch a list of programs and displays that list in a table.

## Core components
- App, Cap and LanguageProvider components

## Pages
- Access Forbidden Page
- Login page
- Not found Page (which shows up when an unhandled route is visited)
- Dashboard page (which is the landing page for the application)
- Something went wrong page (which shows up when an error occurs)

## Organisms
- The Navigation bar
- The OrgChange dropdown
- The MainTable organism

## Molecules
A few of the commonly used molecules like `Status`, `SyncLabel`, `TitleWithStatus` which are repeatedly used throughout the application. Feel free to tweak those as per needs. 

## Atoms
Some atoms are also created like `AvatarIcon`, `CustomSkeleton` which can be tweaked and used as required.

# What to modify?
- Modify the `bugsnagAppVersion` in the `webpack.base.babel.js` to the app version that is intended to be used in the application.
- Also modify the `bugsnagApiKey` in the same file and change it to the API key that is related to the application being set up. Else the bugsnag details for several apps are bound to get mixed up.
``` javascript
const bugsnagAppVersion = `YOUR_APP_HERE__${new Date().getTime()}`;
const bugsnagApiKey = 'YOUR_KEY_HERE';
```

