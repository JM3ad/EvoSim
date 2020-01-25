# Development

# Running locally
- To run the site locally (default port 3000), you can use:
 -- `npm start`
- To run the tests
-- `npm test`

- To build for production
-- `npm run build`

## Hosting
In order to use this as a template, you should start by:
- Removing the firebase files (.firebase & firebase.rc)
- `npx firebase init hosting`
- `npm i` in both parent and functions folder
- You should then be able to run `npx firebase deploy`