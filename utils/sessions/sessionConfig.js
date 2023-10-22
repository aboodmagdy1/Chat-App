module.exports = (app) => {
  //session and errors
  const sessioin = require("express-session"); //to deal with session by express and will add the session object to the req object
  const sessionStore = require("connect-mongodb-session")(sessioin); //fun to save the session in the db
  const flash = require("connect-flash"); //The flash is a special area of the session used for storing messages

  app.use(flash()); //add a flash function in the req object
  //session confegration in db
  const store = new sessionStore({
    uri: process.env.DB_URI,
    collection: "sessions", //the name of the collection that will be created in the db to save the session data
  });
  app.use(
    sessioin({
      resave: false,
      secret: "this is my secret used to hash the session id",
      saveUninitialized: false, // tell the session to save the session data only if there is a change in the session data
      cookie: {
        maxAge: 1 * 60 * 60 * 100, //1 hour
      },
      store: store,
    })
  );
};
