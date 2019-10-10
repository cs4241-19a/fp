import Pact from '../models/pact';
import BaseCtrl from './base';
import User from '../models/user';

export default class PactCtrl extends BaseCtrl {
    model = Pact;

    createPact = (req, res) => {
        const pact = new Pact();
        pact.name = req.body.name;
        pact.owner = req.body.owner;
        pact.private = req.body.private;
        pact.password = req.body.password;
        pact.date_created = req.body.date_created;
        pact.users = [req.body.owner];
        pact.board = {exercises: [], recipes: []};

        pact.save(function(err, pact) {
            if (err) {
                return res.send(err);
            }
            User.findById(req.body.owner, function(err, user) {
                if (err) {
                    return res.send(err);
                }
                user.pact = pact;
                user.save(function(err) {
                    if (err) {
                        return res.send(err);
                    }

                    Pact.findOne({_id: pact._id}).populate('users').exec((error, docs) => {
                        return res.status(200).json(docs);
                    });
                });
            });
        });
    };

    getPact = (req, res) => {
        this.model.findOne({_id: req.params.id}).populate('users').exec((error, docs) => {
            console.log(docs);
            return res.status(200).json(docs);
        });
    };

    postRecipe = (req, res) => {
        this.model.findOne({_id: req.params.id}, function(err, pact) {
            if (pact){
                console.log(pact);
                pact.board.recipes.push(req.body);
                pact.save();
                return res.status(200).json(pact);
            }
        })
    };

    postExercise = (req, res) => {
        this.model.findOne({_id: req.params.id}, function(err, pact) {
            if (pact){
                pact.board.exercises.push(req.body);
                pact.save();
                return res.status(200).json(pact);
            }
        })
    };

    deleteExercise = (req, res) => {
        this.model.findOne({_id: req.params.id}).then(function(pact) {
            pact.board.exercises.pull(req.params.postid);
            pact.save().then(function(new_pact) {
                res.status(201).json(new_pact);
            });
        });
    };

    deleteRecipe = (req, res) => {
        this.model.findOne({_id: req.params.id}).then(function(pact) {
            pact.board.recipes.pull(req.params.postid);
            pact.save().then(function(new_pact) {
                res.status(201).json(new_pact);
            });
        });
    };


    sendNotification = (req, res) => {
        // this.model.findOne({_id: req._id}).populate('users').exec((error, docs) => {
        //     return res.status(200).json(docs);
        // });
    }
}
