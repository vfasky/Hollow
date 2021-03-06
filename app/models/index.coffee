###*
# @module models
# @date: 2014-02-22 11:31:01
# @author: vfasky (vfasky@gmail.com)
# @link: http://vfasky.com
# @version: $Id$
#
# Models 
#
# Examples 
# 
# ```coffee
# database = require './models'
#
# database.User.findAll().success (users) ->
#     console.log users
#
# ```
#
###

fs = require 'fs'
path = require 'path'
config = require '../../config'
Sequelize = require 'sequelize'
lodash = require 'lodash'
database = {}


###*
# 返回实例化的 Sequelize
# @module models/sequelize
###
sequelize = new Sequelize(
    config.equelizeDatabase,
    config.equelizeUsername,
    config.equelizePassword,
        dialect: config.equelizeDialect
        host: config.equelizeHost
        port: config.equelizePort
        maxConcurrentQueries: config.equelizeMaxCon
        pool: config.equelizePool
        #sync: force: true
)


# 动态import model
#
fs.readdirSync(__dirname)
  .filter (file)->
      file.indexOf('.coffee') == -1 and
      file.indexOf('.') != 0 and
      file != 'index.js'
  .forEach (file)->
      model = sequelize.import path.join(__dirname, file)
      database[model.name] = model

Object.keys(database).forEach (modelName)->
    if 'associate' in database[modelName]
        database[modelName].associate database


module.exports = lodash.extend(
  sequelize: sequelize,
  Sequelize: Sequelize
, database)
