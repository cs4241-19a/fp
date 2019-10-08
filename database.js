/*
 * CS 4241 Final Project - Database component
 * by Terry Hearst, Demi Karavoussianis, Kyle Reese, and Tom White
 */

 const Sequelize = require('sequelize');

// Simple file based db using an ORM
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.lite',
  pool: {
    max: 5,
    min: 0,
    aquire: 3000,
    idle: 1000
}
});

class User extends Sequelize.Model{}
class Task extends Sequelize.Model{}

//-------------
//  Databases
//-------------

// Table model for the database
User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    salt: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    hash: {
     type: Sequelize.STRING,
     allowNull: false,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    }
},{sequelize: sequelize, modelName: 'user'});

Task.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    priority: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    dueDate: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    uhoh: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    doLater: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    }
},{sequelize: sequelize, modelName: 'task'});

Task.belongsTo(User);

User.sync();
Task.sync();

//-----------
//  Helpers
//-----------

//getUser
function getUser(login){
    return User.findOne({
        where: {username: login}
    });
}

//getUserTasks
function getUserTasks(login){
    return User.getTasks({
        where: {username: login}
    });
}

//createUser: login(username), peper(salt), browns(hash)
function createUser(login, pepper, browns){
    User.create({
        salt: pepper,
        hash: browns,
        username: login,
    });
}

//createTask
function createTask(object){
    Task.create(object);
}

//updateTask
function updateTask(taskId, object){
    Task.findOne({
        where: {id: taskId}
    }).then(result => {
        result.update(object)
    });
}