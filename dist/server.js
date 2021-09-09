"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const model_1 = require("./digipet/model");
const controller_1 = require("./digipet/controller");
const app = express_1.default();
/**
 * Simplest way to connect a front-end. Unimportant detail right now, although you can read more: https://flaviocopes.com/express-cors/
 */
app.use(cors_1.default());
app.get("/", (req, res) => {
    res.json({
        description: `Welcome to Digipet, the totally original digital pet game! Keep your pet happy, healthy and well-disciplined to win the game. If in doubt, check out the /instructions endpoint!`,
        message: "Welcome to Digipet, the totally original digital pet game! Keep your pet happy, healthy and well-disciplined to win the game. If in doubt, check out the /instructions endpoint!",
    });
});
app.get("/instructions", (req, res) => {
    res.json({
        message: "You can check out your digipet's stats with /digipet, and add various actions after that with the /digipet/[action], for actions like walk, train, feed, ignore and hatch. For example, try /digipet/walk to walk a digipet!",
    });
});
app.get("/digipet", (req, res) => {
    const digipet = model_1.getDigipet();
    if (digipet) {
        res.json({
            description: "Your digipet is waiting for you!",
            message: "Your digipet is waiting for you!",
            digipet,
        });
    }
    else {
        res.json({
            description: "You don't have a digipet yet! Try hatching one with hatch button",
            message: "You don't have a digipet yet! Try hatching one with /hatch",
            digipet: undefined,
        });
    }
});
app.get("/digipet/hatch", (req, res) => {
    const digipet = model_1.getDigipet();
    if (digipet) {
        res.json({
            description: 'You already have a digipet!',
            message: "You can't hatch a digipet now because you already have one!",
            digipet,
        });
    }
    else {
        const digipet = controller_1.hatchDigipet();
        res.json({
            description: 'You have successfully hatched a digipet.',
            message: "You have successfully hatched an adorable new digipet. Just the cutest.",
            digipet,
        });
    }
});
app.get("/digipet/walk", (req, res) => {
    // check the user has a digipet to walk
    if (model_1.getDigipet()) {
        controller_1.walkDigipet();
        res.json({
            description: `You've walked you digipet. Looks happier now!`,
            message: "You walked your digipet. It looks happier now!",
            digipet: model_1.getDigipet(),
        });
    }
    else {
        res.json({
            description: `You don' have a digipet to walk! Please hatch one with the hatch button`,
            message: "You don't have a digipet to walk! Try hatching one with /digipet/hatch",
        });
    }
});
app.get("/digipet/train", (req, res) => {
    // check the user has a digipet to train
    if (model_1.getDigipet()) {
        controller_1.trainDigipet();
        res.json({
            description: 'Your digipet has been trained',
            message: "You trained your digipet. It looks more disciplined now!",
            digipet: model_1.getDigipet(),
        });
    }
    else {
        res.json({
            description: `You don't have a digipet to train. Please hatch one with the hatch button`,
            message: "You don't have a digipet to train! Try hatching one with /digipet/hatch",
        });
    }
});
app.get("/digipet/feed", (req, res) => {
    // check the user has a digipet to train
    if (model_1.getDigipet()) {
        controller_1.feedDigipet();
        res.json({
            description: `You've feed your digipet.`,
            message: "You feed your digipet. It now more nutrious!",
            digipet: model_1.getDigipet(),
        });
    }
    else {
        res.json({
            description: `You don't have a digipet! Please hatch one with the hatch button`,
            message: "You don't have a digipet to feed! Try hatching one with /digipet/hatch",
        });
    }
});
app.get("/digipet/ignore", (req, res) => {
    // check the user has a digipet to ignore
    if (model_1.getDigipet()) {
        console.log('Server before', model_1.getDigipet());
        console.log(controller_1.ignoreDigipet);
        controller_1.ignoreDigipet();
        console.log('Server after', model_1.getDigipet());
        if (Object.values(model_1.getDigipet()).every(element => element > 10)) {
            res.json({
                description: `You've ignored your digipet`,
                message: "You ignored your digipet. It now lost stats!",
                digipet: model_1.getDigipet(),
            });
        }
        else {
            const elems = Object.entries(model_1.getDigipet()).filter(element => element[1] !== 0);
            const rest = elems.reduce((acc, dig) => { return Object.assign(Object.assign({}, acc), { [dig[0]]: dig[1] }); }, {});
            // console.log(rest)
            res.json({
                description: `You've ignored your digipet`,
                message: "You ignored your digipet. It now lost stats!",
                digipet: rest
            });
        }
    }
    else {
        res.json({
            description: `You don't have a digipet to ignore! Please hatch one with the hatch button`,
            message: "You don't have a digipet to ignore! Try hatching one with /digipet/hatch",
        });
    }
});
app.get("/digipet/rehome", (req, res) => {
    // check the user has a digipet to rehome
    if (model_1.getDigipet()) {
        controller_1.rehomeDigipet();
        res.json({
            description: `You have rehomed your digipet! Please hatch one with the hatch button`,
            message: "You have rehomed your pet! Try hatching another one with /digipet/hatch"
        });
    }
    else {
        res.json({
            description: `You don't have a digipet to rehome! Please hatch one with the hatch button`,
            message: "You already don't have a digipet to rehome! Try hatching one with /digipet/hatch",
        });
    }
});
exports.default = app;
