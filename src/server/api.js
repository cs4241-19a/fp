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

    router.post('/user/update', ensureLoggedIn('/login'), async (req, res, next) => {
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

    router.post('/user/events', ensureLoggedIn('/login'), async (req, res) => {
        const {
            user,
            body
        } = req;
        // const {
        //     userId
        // } = body;
        const userId = user._id;
        console.log('/user/events called')
        const events = await Event.find()
        console.log(body)
        console.log(userId)
        console.log(typeof userId)
        let userEvents = []
        if (events) {
            events.forEach(event => {
                if (event.availabilities.hasOwnProperty(String(userId))) {
                    console.log('found user in event', event.title)
                    userEvents.push({
                        name: event.title,
                        eventId: event._id
                    })
                }
            })
            res.json({
                events: userEvents
            });
        } else {
            res.status(404);
            res.json({
                message: "Events not found."
            });
        }

    })


    router.post('/event/create', ensureLoggedIn('/login'), async (req, res) => {
        const {
            user,
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
        }, {
            minimize: false
        });

        await newEvent.save();
        res.redirect(`/event/${newEvent._id}`);
    })

    router.get('/event/:eventId', ensureLoggedIn('/login'), async (req, res) => {
        const {
            user,
            params
        } = req;
        const {
            eventId
        } = params;
        console.log("GETTING EVENT")
        let event = await Event.findById(eventId);
        if (event) {
            let eventMerged = {
                ...event._doc,
                currentUserId: String(user._id),
                currentUserName: user.name
            }
            console.log(eventMerged)
            res.json(eventMerged);
        } else {
            res.status(404).json({
                message: "Event not found."
            });
        }
    })

    router.post('/event/:eventId/update', ensureLoggedIn('/login'), async (req, res) => {
        const {
            user,
            body,
            params
        } = req;
        const {
            userAvailability
        } = body;
        // console.log('attempting to update', userAvailability)
        // console.log('for event id', params.eventId)
        // console.log('for user', user)
        const event = await Event.findById(params.eventId);
        // console.log('found event', event)
        event.availabilities[user._id] = {
            name: user.name,
            userAvailability
        };
        // console.log('updated event', event)
        // await event.save();
        await Event.updateOne({
            _id: params.eventId
        }, event, {
            upsert: true
        })
        // console.log('saved event')
    })



    return router;
};

export default api;