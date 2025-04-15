const dotenv = require('dotenv');
const Mongodb = require('mongodb').MongoClient;

dotenv.config();

let database;

const initDb = (callback) => {
    if (database) {
        console.log("Database is already initialized.");
        return callback(null, database);
    }
    Mongodb.connect(process.env.MONGODB_URL)
        .then((client) => {
            database = client;
            callback(null, database);
        })
        .catch((err) => {
            callback(err);
        })
};

const getDatabase = () => {
    if (!database) {
        throw Error("Database not initialized");
    }
    return database;
}


const dbase = async () => {return await getDatabase().db();}

module.exports = {
    initDb,
    getDatabase,
    dbase
};