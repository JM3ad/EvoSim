# Development

## First time
- `npm install`

## Day to day
- To run the site locally (default port 3000), you can use:
 -- `npm start`
- To run the tests
-- `npm test`

# Releases 

## First time
In order to use this as a template, you should start by:
- Removing the firebase files (.firebase & firebase.rc)
- `npx firebase init hosting`
- `npm i` in both parent and functions folder

## After
- To build for production
-- `npm run build`
- You should then be able to run `npx firebase deploy`