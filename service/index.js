const express = require('express');
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const OpenAI = require("openai");
const DB = require("./database.js");
require("dotenv").config();

const authCookieName = "token";

const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(cookieParser());

app.use(express.static("public"));

let apiRouter = express.Router();
app.use("/api", apiRouter);

apiRouter.get("/gameIDCounter", async (req, res) => {
    const gameIDCounter = await DB.getGameIDCounter()
    res.send({gameIDCounter: gameIDCounter});
});

apiRouter.put("/gameIDCounter/increment", async (req, res) => {
    await DB.incrementGameIDCounter();
    res.send({CounterStatus: "Incremented"});
});

apiRouter.get("/wins", async (req, res) => {
    const wins = await DB.getWins();
    res.send({wins: wins});
})

apiRouter.put("/wins/increment", async (req, res) => {
    await DB.incrementWins();
    res.send({WinStatus: "Incremented"});
})

apiRouter.get("/losses", async (req, res) => {
    const losses = await DB.getLosses();
    res.send({losses: losses});
})

apiRouter.put("/losses/increment", async (req, res) => {
    await DB.incrementLosses();
    res.send({LossStatus: "Incremented"});
})

apiRouter.post("/auth/create", async (req, res) => {
    if (await getUser("email", req.body.email)) {
        res.status(409).send({msg: "Existing user"});
    } else {
        const user = await createUser(req.body.email, req.body.password);

        setAuthCookie(res, user.token);
        res.send({email: user.email});
    }
});

apiRouter.post("/auth/login", async (req, res) => {
    const user = await getUser("email", req.body.email);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            user.token = uuid.v4();
            await DB.updateUser(user);
            setAuthCookie(res, user.token);
            res.send({email: user.email});
            return;
        } 
    }
    res.status(401).send({msg: "Unauthorized"});
});

apiRouter.delete("/auth/logout", async (req, res) => {
    const user = await getUser("token", req.cookies[authCookieName]);
    if (user) {
        delete user.token;
        DB.updateUser(user);
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});

apiRouter.post("/chat", async (req, res) => {
    const {prompt} = req.body;
    const client = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

    const response = await client.chat.completions.create({
        model: "gpt-4.1",
        messages: [{ role: "user", content: prompt}],
    });

    res.json({ reply: response.choices[0].message.content });
});

const verifyAuth = async (req, res, next) => {
    const user = await getUser("token", req.cookies[authCookieName]);
    if (user) {
        next();
    } else {
        res.status(401).send({msg: "Unauthorized"});
    }
};

apiRouter.get("/games", verifyAuth, async (req, res) => {
    const games = await DB.getGames();
    // console.log(games);
    if (games) {
        res.send(games);
    } else {
        res.send([]);
    }
});

apiRouter.post("/game", verifyAuth, async (req, res) => {
    // console.log(req.body);
    const games = await updateGames(req.body);
    console.log(games);
    res.send(games);
});

app.use(function (err, req, res, next) {
    res.status(500).send({type: err.name, message: err.message});
});

async function updateGames(newGames) {
    const games = await DB.updateGames(newGames);
    return games;
}

async function createUser(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        email: email,
        password: passwordHash,
        token: uuid.v4(),
    };
    await DB.addUser(user);

    return user;
}

async function getUser(field, value) {
    if (!value) return null;

    if (field === "token") {
        return DB.getUserByToken(value);
    }
    return DB.getUser(value);
}

function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});