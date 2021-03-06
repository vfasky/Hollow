// Generated by CoffeeScript 1.7.1

/**
 * 测试模板扩展
 * @date: 2014-02-23 10:55:29
 * @author: vfasky (vfasky@gmail.com)
 * @link: http://vfasky.com
 * @version: $Id$
 */

(function() {
  var assert, config, swig;

  config = require('../config');

  swig = require('../app/hollow/swigext');

  assert = require('assert');

  describe('module', function() {
    return describe('staticUrl', function() {
      return it('css url', function() {
        if (config.staticHost === '') {
          return assert.equal(swig.render("{{ 'style/hollow.css' | staticUrl }}"), 'style/hollow.css');
        } else {
          return assert.equal(swig.render("{{ 'style/hollow.css' | staticUrl }}"), "//" + config.staticHost + "/style/hollow.css");
        }
      });
    });
  });

}).call(this);
