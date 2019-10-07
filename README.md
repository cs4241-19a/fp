## How to develop with hot reload

https://dev.to/loujaybee/using-create-react-app-with-express

- First ensure in package.json there is a line `proxy: http://localhost:300` or whatever port server.js runs on
- In one terminal run `node server.js` OR `npm start`, they're the same thing
- In a different terminal run `npm run watch`. This allows to make any changes and parcel will automatically rebuild your files
    - The server now serves from the /dist/ directory. This exists only when `parcel watch` is actively being run, and gets deleted once the watch command is terminated.
- For the final production version we will run `npm run build` which permanently builds the files into a /dist/ directory. 



### Note on login.html styling
The file `src/css/login-t.css` is an editable CSS file with @tailwind dependencies at the top. Write any hardcode CSS in here. You then need to run the command `npx tailwind build src/css/login-t.css -o src/css/login-styles.css`. This is included as a script in package.json so you can instead run `npm run css`. The file `src/css/index-styles.css` is the expanded CSS file with the tailwind CSS. This is the file that should be used as the stylesheet for the login page/component.

Don't be worried about any errors thrown when npm installing tailwindcss (unless they become a problem)