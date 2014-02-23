// Generated by CoffeeScript 1.7.1

/**
 * Hollow ，没有威权的社区
 */

(function() {
  var app, config, database, express, http, path, routes, swig;

  express = require('express');

  http = require('http');

  path = require('path');

  swig = require('./hollow/swigext');

  routes = require('./routes');

  config = require('./config');

  database = require('./models');

  app = express();

  app.engine('html', swig.renderFile);

  app.set('port', process.env.PORT || 80);

  app.set('view engine', 'html');

  app.set('views', path.join(__dirname, 'views'));

  app.use(express.favicon());

  app.use(express.logger('dev'));

  app.use(express.json());

  app.use(express.urlencoded());

  app.use(express.methodOverride());

  app.use(app.router);

  app.use(express["static"](path.join(__dirname, 'public')));

  if ('development' === app.get('env')) {
    app.set('view cache', false);
    swig.setDefaults({
      cache: false
    });
    app.use(express.errorHandler());
  }

  app.get('/', routes.index);

  database.sequelize.sync({
    force: true
  }).complete(function(err) {
    if (err) {
      throw err;
    }
    return http.createServer(app).listen(app.get('port'), function() {
      console.log('Express server listening on port ' + app.get('port'));
    });
  });

}).call(this);
