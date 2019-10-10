import {
    readFile as readFileDefault
} from "fs";
import {
    promisify
} from "util";
import bcrypt from "bcrypt";

export const readFile = promisify(readFileDefault);

export const ensureLoggedIn = returnTo => (req, res, next) => {
    console.log("check logged in");
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect(returnTo);
    }
};

const SALT_ROUNDS = 10;

export const hashPassword = async password => {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    return hash;
};

export const comparePassword = async (password, hash) => {
    const comparison = await bcrypt.compare(password, hash);
    return comparison;
};