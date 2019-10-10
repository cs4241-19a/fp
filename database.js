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

// Table model for the User database
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

// Table model for the Task database
Task.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
    	type: Sequelize.INTEGER,
    	references: {
    		model: User,
    		key: 'id',
    		deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    	},
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    priority: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    dueDate: {
        type: Sequelize.STRING,
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

//startDB function
function startDB(){
    return sequelize.authenticate()
        .then(() => {
            Task.belongsTo(User);
            User.sync();
            Task.sync();
        })
}

//-----------
//  Helpers
//-----------

//getUser
function getUser(username){
    return User.findOne({
        where: {username: username}
    });
}

//getUserTasks
function getUserTasks(username){
	return getUser(username).then((user) => {
		return Task.findAll({
		    where: {userId: user.id}
		});
    })
}

//createUser
function createUser(username, salt, hash){
    return User.create({
        username: username,
        salt: salt,
        hash: hash,
    });
}

//createTask
function createTask(object){
    return Task.create(object);
}

//updateTask
function updateTask(taskId, object){
    return Task.findOne({
        where: {id: taskId}
    }).then(result => {
        return result.update(object)
    }).catch(err => console.log(err))
}

//deleteTask
function deleteTask(taskId){
	return Task.destroy({
		where: {id: taskId}
	})
}

module.exports = {startDB, getUser, getUserTasks, createUser, createTask, updateTask, deleteTask}
