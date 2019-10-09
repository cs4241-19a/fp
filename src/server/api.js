import express from "express";
import {
    ensureLoggedIn,
    hashPassword
} from "./util";
import passport from "passport";
import {
    User,
    Event
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
    router.post('/event/create', async (req, res) => {
        const {
            body
        } = req;
        const {
            title,
            startTime,
            stopTime,
            days
        } = body;

        const newEvent = new Event({
            title,
            startTime,
            stopTime,
            days,
            availabilities: {}
        });

        await newEvent.save();
        res.redirect(`/event/${newEvent._id}`);
    })
    router.get('/event/:eventId', async (req, res) => {
        const { params } = req;
        const { eventId } = params;

        const event = await Event.findById(eventId);
        if (event) {
            res.json(event);
        } else {
            res.status(404).json({ message: "Event not found." });
        }
    })

    router.post('/event/:eventId/update', ensureLoggedIn, async (req, res) => {
        const { user, body, params } = req;
        const { userAvailability } = body;

        const event = await Event.findById(params.eventId);
        event.availabilities[user._id] = userAvailability;
        await event.save();
    })



    return router;
};

export default api;