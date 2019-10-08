/*
 * CS 4241 Final Project - Database component
 * by Terry Hearst, Demi Karavoussianis, Kyle Reese, and Tom White
 */

 const http = require( 'http' ),
 Sequalize = require('sequelize'),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

// Simple file based db using an ORM
const sequelize = new Sequalize({
  dialect: 'sqlite',
  storage: 'database.lite',
  pool: {
    max: 5,
    min: 0,
    aquire: 3000,
    idle: 1000
}
});

class User extends Sequalize.Model{}
class Task extends Sequalize.Model{}

//-------------
//  Databases
//-------------

// Table model for the database
User.init({
    id: {
        type: Sequalize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    salt: {
        type: Sequalize.STRING,
        allowNull: false,
    },
    hash: {
     type: Sequalize.STRING,
     allowNull: false,
    },
    username: {
        type: Sequalize.STRING,
        allowNull: false,
    }
},{sequelize: sequelize, modelName: 'user'});

Task.init({
    id: {
      type: Sequalize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
        type: Sequalize.STRING,
        allowNull: false,
    },
    priority: {
        type: Sequalize.INTEGER,
        allowNull: false,
    },
    completed: {
        type: Sequalize.BOOLEAN,
        allowNull: false,
    },
    startTime: {
        type: Sequalize.DATE,
        allowNull: false,
    },
    dueDate: {
        type: Sequalize.DATE,
        allowNull: false,
    },
    uhoh: {
        type: Sequalize.BOOLEAN,
        allowNull: false,
    },
    description: {
        type: Sequalize.STRING,
        allowNull: false,
    },
    doLater: {
        type: Sequalize.BOOLEAN,
        allowNull: false,
    }
},{sequelize: sequelize, modelName: 'task'});

User.sync().then(() => {
  return User.create();
});

Task.sync().then(() => {
  return Task.create();
});