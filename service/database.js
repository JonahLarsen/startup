const { MongoClient } = require("mongodb");
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`

const client = new MongoClient(url);
const db = client.db('rental');

const games = db.collection('games');
const users = db.collection('users');
const gamesStatus = db.collection('gamesStatus');