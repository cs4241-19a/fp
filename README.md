## How to develop with hot reload

https://dev.to/loujaybee/using-create-react-app-with-express

- First ensure in package.json there is a line `proxy: http://localhost:300` or whatever port server.js runs on
- In one terminal run `node server.js` OR `npm start`, they're the same thing
- In a different terminal run `npm run watch`. This allows to make any changes and parcel will automatically rebuild your files
    - The server now serves from the /dist/ directory. This exists only when `parcel watch` is actively being run, and gets deleted once the watch command is terminated.
- For the final production version we will run `npm run build` which permanently builds the files into a /dist/ directory. 

## State Storage
- Implemented using easy-peasy
- Store object model in store.js
- Store provided at highest level component
    - App comp will render Vis, FeedContainer, etc, all wrapper in a <StoreProvider> component
    - Store object created from model object with createStore()

### Note on login.html styling
The file `src/css/login-t.css` is an editable CSS file with @tailwind dependencies at the top. Write any hardcode CSS in here. You then need to run the command `npx tailwind build src/css/login-t.css -o src/css/login-styles.css`. This is included as a script in package.json so you can instead run `npm run css`. The file `src/css/index-styles.css` is the expanded CSS file with the tailwind CSS. This is the file that should be used as the stylesheet for the login page/component.

Don't be worried about any errors thrown when npm installing tailwindcss (unless they become a problem)


### Brain dump / notes
- Use material ui Avatar components for profile pictures
- Use codepen hambuger menu icon because it is dope
- Should you get directed to the login always or can should you be able to use the site without an account, and the option to log in is provided in the app bar
- How does a user know what a vis will look like from a feed item? Should they care? Or just choose based on song name
- We should avoid reloading pages or having lots of htmls
    - For example, clicking on a feed item should cause a state change of some `vis_container` comp, which causes it to render the new `vis` comp inside. Feed items, app bar, etc. remain unaffected and no need to reload (except maybe change some styling of the currently displayed feed item for tactility)