const { MongoClient } = require("mongodb");
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`

const client = new MongoClient(url);
const db = client.db('rental');

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