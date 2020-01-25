# Readme

This project was created with [Create React App](https://github.com/facebook/create-react-app) and set up following [this online guide](https://medium.com/@muccy/install-react-with-typescript-in-a-firebase-hosting-project-8db66c59b202) 

## Development

- To run the site locally (default port 3000), you can use:
 -- `npm start`
- To run the tests
-- `npm test`

- To build for production
-- `npm run build`

## Use as a template
In order to use this as a template, you should start by:
- Removing the firebase files (.firebase & firebase.rc)
- `npx firebase init hosting`
- `npm i` in both parent and functions folder
- You should then be able to run `npx firebase deploy`