import express from "express";
import {
    ensureLoggedIn,
    hashPassword
} from "./util";
import passport from "passport";
import {
    User
} from './db'

const api = db => {
    const router = express.Router();

    router.post('/user/create', async (req, res, next) => {
            const {
                body
            } = req;
            const {
                name,
                email,
                password
            } = body;
            const users = await User.find({
                email
            });
            console.log("found user", users);
            if (users.length > 0) {
                res.status(500).json({
                    message: "That email is not available."
                });
            } else {
                // Encrypt password
                const passwordHash = await hashPassword(password);
                const newUser = new User({
                    name,
                    email,
                    password: passwordHash,
                    globalAvailability: []

                })
                console.log(newUser)
                newUser.save(function (err, newUser) {})
                next();
            }
        },
        passport.authenticate("local", {
            session: true,
            successRedirect: "/",
            failureRedirect: "/user/login"
        }));

    // router.get('/user/login')
    // router.post('/user/logout')
    // router.post('/user/:user/update')

    router.get('/user/:userId', async (req, res) => {
        const {
            userId
        } = req.params;
        const user = await User.findById(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404);
            res.json({
                message: "User not found."
            });
        }
    });

    // router.get('/user/:user/events')
    // router.post('/event/create')
    // router.get('/event/:eventId')
    // router.post('/event/:eventId/update')



    return router;
};

export default api;