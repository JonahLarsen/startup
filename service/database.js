const { MongoClient } = require("mongodb");
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`

const client = new MongoClient(url);
const db = client.db('startup');

const games = db.collection('games');
const users = db.collection('users');
const gamesStatus = db.collection('gamesStatus');

(async function testConnection() {
    try {
        await db.command({ping: 1});
        console.log("Connect to database");
    } catch (ex) {
        console.log("Unable to connect, error:", ex.message);
    }
})();

function getUser(email){
    return users.findOne({email: email});
}

function getUserByToken(token) {
    return users.findOne({ token: token });
}

async function addUser(user) {
    await users.insertOne(user);
}

async function updateUser(user) {
    await users.updateOne({email: user.email}, {$set: user});
}

function getGameIDCounter() {
    return gamesStatus.findOne({name: "gameIDCounter"}).gameIDCounter;
}

async function incrementGameIDCounter() {
    await gamesStatus.updateOne({name: "gameIDCounter"}, {$inc: {gameIDCounter: 1}});
}

function getWins() {
    return gamesStatus.findOne({name: "wins"}).wins;
}

async function incrementWins() {
    await gamesStatus.updateOne({name: "wins"}, {$inc: {wins: 1}});
}