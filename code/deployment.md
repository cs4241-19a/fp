## Run information
### Development mode
`npm run dev`: [concurrently](https://github.com/kimmobrunfeldt/concurrently) execute MongoDB, Angular build, TypeScript compiler and Express server.

A window will automatically open at [localhost:4200](http://localhost:4200). Angular and Express files are being watched. Any change automatically creates a new bundle, restart Express server and reload your browser.

### Production mode
`npm run prod`: run the project with a production bundle and AOT compilation listening at [localhost:3000](http://localhost:3000) 

## Deploy (Heroku)
1. Go to Heroku and create a new app (eg: `your-app-name`)
2. Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
3. `heroku login`
4. `mkdir your-app-name && cd your-app-name`
5. `git init`
6. `heroku git:remote -a your-app-name`
7. Download this repo and copy all files into `your-app-name` folder
8. `npm i`
9. Edit `package.json` as following:
   - add this line to scripts: `"postinstall": "tsc -p server && ng build --aot --prod"`
   - move the following packages from devDependencies to dependencies: `@angular/cli`, `@angular/compiler-cli`, `@types/*`, `chai`, `chai-http` and `typescript`.
10. Edit `.env` and replace the MongoDB URI with a real remote MongoDB server. You can create a MongoDB server with Heroku or mLab.
11. `git add .`
12. `git commit -m "Going to Heroku"`
13. `git push heroku master`
14. `heroku open` and a window will open with your app online
