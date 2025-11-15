const express = require('express');
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");

const authCookieName = "token";

let users = [];
let games = [];
let gameIDCounter = 1;

const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(cookieParser());

app.use(express.static("public"));

let apiRouter = express.Router();
app.use("/api", apiRouter);

apiRouter.get("/gameIDCounter", async (req, res) => {
    res.send({gameIDCounter: gameIDCounter});
});

apiRouter.put("/gameIDCounter/increment", async (req, res) => {
    gameIDCounter++;
    res.send({CounterStatus: "Incremented"});
});

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
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});

const verifyAuth = async (req, res, next) => {
    const user = await getUser("token", req.cookies[authCookieName]);
    if (user) {
        next();
    } else {
        res.status(401).send({msg: "Unauthorized"});
    }
};

apiRouter.get("/games", verifyAuth, (req, res) => {
    res.send(games);
});

apiRouter.post("/game", verifyAuth, (req, res) => {
    games = updateGames(req.body);
    res.send(games);
});

app.use(function (err, req, res, next) {
    res.status(500).send({type: err.name, message: err.message});
});

function updateGames(newGames) {
    games = newGames
}

async function createUser(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        email: email,
        password: passwordHash,
        token: uuid.v4(),
    };
    users.push(user);

    return user;
}

async function getUser(field, value) {
    if (!value) return null;

    return users.find((u) => u[field] === value);
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