## How to develop with hot reload

https://dev.to/loujaybee/using-create-react-app-with-express

- First ensure in package.json there is a line `proxy: http://localhost:300` or whatever port server.js runs on
- In one terminal run `node server.js`
- In a different terminal run `npm start`