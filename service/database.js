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

async function getGameIDCounter() {
    const gameIDCounter = await gamesStatus.findOne({name: "gameIDCounter"});
    return gameIDCounter.gameIDCounter;

}

async function incrementGameIDCounter() {
    await gamesStatus.updateOne({name: "gameIDCounter"}, {$inc: {gameIDCounter: 1}});
}

async function getWins() {
    const wins = await gamesStatus.findOne({name: "wins"});
    return wins.wins;
}

async function incrementWins() {
    await gamesStatus.updateOne({name: "wins"}, {$inc: {wins: 1}});
}

async function getLosses() {
    const losses = await gamesStatus.findOne({name: "losses"});
    return losses.losses;
}

async function incrementLosses() {
    await gamesStatus.updateOne({name: "losses"}, {$inc: {losses: 1}});
}

function getGames() {
    return games.find({}).toArray();
}

async function updateGames(newGames) {
    await games.drop();
    await games.insertMany(newGames);
}

module.exports = {
    getUser,
    getUserByToken,
    addUser,
    updateUser,
    getGameIDCounter,
    incrementGameIDCounter,
    getWins,
    incrementWins,
    getLosses,
    incrementLosses,
    getGames,
    updateGames,
}