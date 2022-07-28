const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const helpers = require("./utils/helpers");

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');

const hbs = exphbs.create({ helpers });
const sess = {
  //hash based msg authentication code
  secret: "Super secret secret",
  //instantiates the cookie
  cookie: {},
  //resave forces the session to be saved, unless false
  resave: false,
  //when new session is made, will save to store
  saveUnitialized: true,
  //this will create the connection with the database and allow it to save
  store: new SequelizeStore({
    db: sequelize
  })
};
 
app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
