import express from "express";
import cors from "cors";
import { getDigipet} from "./digipet/model";
import { hatchDigipet, walkDigipet, trainDigipet, feedDigipet, ignoreDigipet, rehomeDigipet } from "./digipet/controller";

const app = express();

/**
 * Simplest way to connect a front-end. Unimportant detail right now, although you can read more: https://flaviocopes.com/express-cors/
 */
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    description: `Welcome to Digipet, the totally original digital pet game! Keep your pet happy, healthy and well-disciplined to win the game. If in doubt, check out the /instructions endpoint!`,
    message:
      "Welcome to Digipet, the totally original digital pet game! Keep your pet happy, healthy and well-disciplined to win the game. If in doubt, check out the /instructions endpoint!",
  });
});

app.get("/instructions", (req, res) => {
  res.json({
    message:
      "You can check out your digipet's stats with /digipet, and add various actions after that with the /digipet/[action], for actions like walk, train, feed, ignore and hatch. For example, try /digipet/walk to walk a digipet!",
  });
});

app.get("/digipet", (req, res) => {
  const digipet = getDigipet();
  if (digipet) {
    res.json({
      description: "Your digipet is waiting for you!",
      message: "Your digipet is waiting for you!",
      digipet, // equivalent to digipet: digipet
    });
  } else {
    res.json({
      description: "You don't have a digipet yet! Try hatching one with hatch button",
      message: "You don't have a digipet yet! Try hatching one with /hatch",
      digipet: undefined,
    });
  }
});

app.get("/digipet/hatch", (req, res) => {
  const digipet = getDigipet();
  if (digipet) {
    res.json({
      description: 'You already have a digipet!',
      message: "You can't hatch a digipet now because you already have one!",
      digipet,
    });
  } else {
    const digipet = hatchDigipet();
    res.json({
      description: 'You have successfully hatched a digipet.',
      message:
        "You have successfully hatched an adorable new digipet. Just the cutest.",
      digipet,
    });
  }
});

app.get("/digipet/walk", (req, res) => {
  // check the user has a digipet to walk
  if (getDigipet()) {
    walkDigipet();
    res.json({
      description: `You've walked you digipet. Looks happier now!`,
      message: "You walked your digipet. It looks happier now!",
      digipet: getDigipet(),
    });
  } else {
    res.json({
      description: `You don' have a digipet to walk! Please hatch one with the hatch button`,
      message:
        "You don't have a digipet to walk! Try hatching one with /digipet/hatch",
    });
  }
});

app.get("/digipet/train", (req, res) => {
  // check the user has a digipet to train
  if (getDigipet()) {
    trainDigipet();
    res.json({
      description:'Your digipet has been trained',
      message: "You trained your digipet. It looks more disciplined now!",
      digipet: getDigipet(),
    });
  } else {
    res.json({
      description:`You don't have a digipet to train. Please hatch one with the hatch button`,
      message:
        "You don't have a digipet to train! Try hatching one with /digipet/hatch",
    });
  }
});

app.get("/digipet/feed", (req, res) => {
  // check the user has a digipet to train
  if (getDigipet()) {
    feedDigipet();
    res.json({
      description:`You've feed your digipet.`,
      message: "You feed your digipet. It now more nutrious!",
      digipet: getDigipet(),
    });
  } else {
    res.json({
      description:`You don't have a digipet! Please hatch one with the hatch button`,
      message:
        "You don't have a digipet to feed! Try hatching one with /digipet/hatch",
    });
  }
});

app.get("/digipet/ignore", (req, res) => {
  // check the user has a digipet to ignore
  if (getDigipet()) {
    console.log('Server before',getDigipet())
    console.log(ignoreDigipet)
    ignoreDigipet();
    console.log('Server after',getDigipet())

    if(Object.values(getDigipet()!).every(element => element > 10)){
      res.json({
        description:`You've ignored your digipet`,
        message: "You ignored your digipet. It now lost stats!",
        digipet: getDigipet(),
      });
    } else {

      const elems = Object.entries(getDigipet()!).filter(element => element[1] !== 0);
      const rest = elems.reduce((acc,dig) => {return {...acc,[dig[0]]: dig[1]}},{});
      // console.log(rest)
      res.json({
        description:`You've ignored your digipet`,
        message: "You ignored your digipet. It now lost stats!",
        digipet: rest
      });
    }
  } else {
    res.json({
      description:`You don't have a digipet to ignore! Please hatch one with the hatch button`,
      message:
        "You don't have a digipet to ignore! Try hatching one with /digipet/hatch",
    });
  }
});

app.get("/digipet/rehome", (req, res) => {
  // check the user has a digipet to rehome
  if (getDigipet()) {
    rehomeDigipet();
      res.json({
        description:`You have rehomed your digipet! Please hatch one with the hatch button`,
        message: "You have rehomed your pet! Try hatching another one with /digipet/hatch"
      });
  } else {
    res.json({
      description:`You don't have a digipet to rehome! Please hatch one with the hatch button`,
      message:
        "You already don't have a digipet to rehome! Try hatching one with /digipet/hatch",
    });
  }
});

export default app;
