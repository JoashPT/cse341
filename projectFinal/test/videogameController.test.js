const videogameController = require('../controller/videogameController');
const mongodb = require('../data/database');
const {MongoClient} = require('mongodb');
const TestResponse = require('./test-response');

jest.mock('../data/database', () => ({
    ...jest.requireActual('../data/database'),
    dbase: jest.fn()
}));

describe('testing videogameController', () => {
    let client;
    let db;

    beforeAll(async () => {
        client = await MongoClient.connect(globalThis.__MONGO_URI__, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        db = client.db(globalThis.__MONGO_DB_NAME__);
        mongodb.dbase.mockResolvedValue(db);
    });

    afterAll(async () => {
        await client.close();
    });

    beforeEach(async () => {
        await db.collection('videogame').deleteMany({});

    });

    it('get all videogame music documents', async () => {
        const videogameCollection = db.collection('videogame');
  
        const mockVideogame = [
            {id: "1234", title: "life", videogame: "bleach", band: "yui"},
            {id: "5678", title: "imnm", videogame: "naruto", band: "mass missile"},
            {id: "9101", title: "sls", videogame: "persona", band: "nana kitade"}
        ]

        await videogameCollection.insertMany(mockVideogame);

        const req = {};
        const res = new TestResponse();

        await videogameController.getAll(req, res);

        expect(res.statusCode).toBe(200);
        expect(res.data).toEqual(mockVideogame);
    })
})
