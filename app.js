// Generated by CoffeeScript 1.7.1

/**
 * Hollow ，没有威权的社区
 */

(function() {
  var SessionStor, app, config, database, express, http, path, routes, swig;

  express = require('express');

  http = require('http');

  path = require('path');

  swig = require('./app/hollow/swigext');

  routes = require('./app/routes');

  config = require('./config');

  database = require('./app/models');

  SessionStor = require('./app/middleware/sessionstor')(express);

  app = express();

  app.engine('html', swig.renderFile);

  app.set('port', process.env.PORT || 80);

  app.set('view engine', 'html');

  app.set('views', path.join(__dirname, 'app', 'views'));

  app.use(express.favicon());

  app.use(express["static"](path.join(__dirname, 'public')));

  app.use(express.logger('dev'));

  app.use(express.json());

  app.use(express.urlencoded());

  app.use(express.methodOverride());

  app.use(express.cookieParser());

  if ('development' === app.get('env')) {
    app.set('view cache', false);
    swig.setDefaults({
      cache: false
    });
    app.use(express.errorHandler());
  }

  database.sequelize.sync({
    force: true
  }).complete(function(err) {
    if (err) {
      throw err;
    }
    app.use(express.session({
      secret: config.sessionSecret,
      store: new SessionStor(database.Session)
    }));
    app.use(app.router);
    app.get('/', routes.index);
    return http.createServer(app).listen(app.get('port'), function() {
      console.log('Express server listening on port ' + app.get('port'));
    });
  });

}).call(this);
