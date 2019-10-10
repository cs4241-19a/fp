import * as jwt from 'jsonwebtoken';
import * as admin from 'firebase-admin';

import User from '../models/user';
import BaseCtrl from './base';
import Pact from '../models/pact';

export default class UserCtrl extends BaseCtrl {

    model = User;

    login = (req, res) => {
        this.model.findOne({email: req.body.email}, (err, user) => {
            if (!user) {
                return res.sendStatus(403);
            }
            user.comparePassword(req.body.password, (error, isMatch) => {
                if (!isMatch) {
                    return res.sendStatus(403);
                }
                const token = jwt.sign({user}, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
                res.status(200).json({token});
            });
        });
    };

    getPacts = (req, res) => {
        this.model.findOne({_id: req.params.id}).populate('pact').exec((error, docs) => {
            console.log(docs);
            return res.status(200).json(docs);
        });
    };

    joinPact = (req, res) => {
        this.model.findOne({_id: req.params.id}, (err, user) => {
            if (user) {
                Pact.findOne({name : req.body.name}, (err, pact) => {
                    if (pact){
                        if (pact.private){
                            if (JSON.stringify(pact.password) != JSON.stringify(req.body.password)){
                                return res.status(200).json({"error": "Incorrect password"});
                            }
                        }
                        // Update user and pact
                        user.pact = pact;
                        pact.users.push(user._id);
                        user.save();
                        pact.save().then(()=>{
                            // Send full model
                            Pact.findOne({_id: pact._id}).populate('users').exec((error, docs) => {
                                return res.status(200).json(docs);
                            });
                        });
                    }
                })
            }
        });
    };

    leavePact = (req, res) => {
        this.model.findOne({_id: req.params.id}, (err, user) => {
            if (user) {
                Pact.findOne({_id: user.pact}, (err, pact) => {
                    console.log(pact.users);
                    console.log(user._id);
                    pact.users = pact.users.filter(function(e) {
                        return JSON.stringify(e) != JSON.stringify(user._id);
                    });
                    pact.save();
                    user.pact = new Pact();
                    user.save();
                    return res.status(201).json(req.body);
                });
            }
        });
    };

    addLog = (req, res) => {
        this.model.findOne({_id: req.params.id}, (err, user) => {
            if (user) {
                console.log(req.body);
                user.logs.unshift(req.body);
                user.save();
                res.status(201).json(req.body);
            }
        });
    };

    editLog = (req, res) => {
        User.updateOne({_id: req.params.id, logs: {$elemMatch: {_id: req.body._id}}},
            {
                $set: {
                    'logs.$.date': req.body.date,
                    'logs.$.unit': req.body.unit,
                    'logs.$.weight': req.body.weight
                }
            },
            {'new': true, 'safe': true, 'upsert': true}).then(function(user) {
            res.status(201).json(user);
        });
    };

    deleteLog = (req, res) => {
        this.model.findOne({_id: req.params.id}).then(function(user) {
           if (user){
               console.log(req.params.logid)
               user.logs.pull(req.params.logid);
               user.save().then(function(new_user) {
                   res.status(201).json(new_user);
               });
           }
        });
    };

    addFile = (req, res) => {
        console.log("IN FILE");
        const file = req.file;
        console.log(req.file);
        // let bucket = admin.storage().bucket();
        // bucket.upload( file, {
        //     gzip: true,
        //     metadata: {
        //         cacheControl: 'public, max-age=31536000',
        //     },
        // });
        return res.status(201)
    }
}
