const animeController = require('../controller/animeController');
const mongodb = require('../data/database');
const {MongoClient} = require('mongodb');
const TestResponse = require('./test-response');

jest.mock('../data/database', () => ({
    ...jest.requireActual('../data/database'),
    dbase: jest.fn()
}));

describe('testing animecontroller', () => {
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
        await db.collection('anime').deleteMany({});

    });

    it('get all anime music documents', async () => {
        const animeCollection = db.collection('anime');
  
        const mockAnime = [
            {id: "1234", title: "life", anime: "bleach", band: "yui"},
            {id: "5678", title: "imnm", anime: "naruto", band: "mass missile"},
            {id: "9101", title: "sls", anime: "persona", band: "nana kitade"}
        ]

        await animeCollection.insertMany(mockAnime);

        const req = {};
        const res = new TestResponse();

        await animeController.getAll(req, res);

        expect(res.statusCode).toBe(200);
        expect(res.data).toEqual(mockAnime);
    })
})
