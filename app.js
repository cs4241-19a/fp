const express = require("express"),
    hbs = require("express-handlebars"),
    path = require("path"),
    morgan = require("morgan"),
    compression = require("compression"),
    helmet = require("helmet"),
    bodyParser = require('body-parser'),
    firebaseAdmin = require("firebase-admin");

const app = express();
const port = process.env.PORT | 3000;



const serviceAccount = require("./private/serviceAccountCredentials.json");

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://cs4241-fp-26fee.firebaseio.com"
});

const authRouter = require('./routes/auth-routes');
const gameRouter = require('./routes/game-routes');
const gameDataRouter = require('./routes/game-data-routes');


// morgan logger
app.use(morgan("dev"));
app.use(compression());
app.use(helmet());

// template engine setup (handlebars)
app.engine("hbs", hbs({helpers: require("./views/helpers.js").helpers, extname: "hbs", defaultLayout: "layout", layoutsDir: __dirname + "/views/layouts/"}));
// app.engine("hbs", hbs({extname: "hbs", defaultLayout: "layout", layoutsDir: __dirname + "/views/layouts/"}));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(express.static("public"));
// app.use("/scripts", express.static(__dirname + "/node_modules/"));

app.get("/", function(req, res) {
    res.render("index");
});

app.use(bodyParser.json());         // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: false
}));

app.use('/auth', authRouter);  // handel sign ups
app.use('/games', gameRouter);  // load game pages
app.use('/submit/games', gameDataRouter);  // store game data


app.listen(port, () => console.log(`Listening on port ${port}`));