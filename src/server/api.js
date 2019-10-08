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
                await newUser.save();
                next();
            }
        },
        passport.authenticate("local", {
            session: true,
            successRedirect: "/",
            failureRedirect: "/login"
        }));

    router.post('/user/login', passport.authenticate("local", {
        session: true,
        failureRedirect: "/login",
        successRedirect: "/new"
    }));

    router.post('/user/logout', (req, res) => {
        const {
            session
        } = req;
        if (session) {
            session.destroy();
        }
        res.redirect("/");
    });

    router.post('/user/update', ensureLoggedIn, async (req, res, next) => {
        const {
            user,
            body
        } = req;
        const {
            globalAvailability
        } = body;
        console.log('updating user', globalAvailability)
        await User.findByIdAndUpdate(user._id, {
            $set: {
                globalAvailability
            }
        })
    });

    router.get('/user/:userId', async (req, res) => {
        const {
            userId
        } = req.params;
        const user = await User.findById(userId);
        console.log('current user', user)
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