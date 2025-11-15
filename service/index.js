const express = require('express');
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");

const authCookieName = "token";

let users = [];
let games = [];

const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

let apiRouter = express.Router();
app.use("/api", apiRouter);


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
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});