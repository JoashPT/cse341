const contemporaryController = require('../controller/contemporaryController');
const mongodb = require('../data/database');
const {MongoClient} = require('mongodb');
const TestResponse = require('./test-response');

jest.mock('../data/database', () => ({
    ...jest.requireActual('../data/database'),
    dbase: jest.fn()
}));

describe('testing contemporaryController', () => {
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
        await db.collection('contemporary').deleteMany({});

    });

    it('get all contemporary music documents', async () => {
        const contemporaryCollection = db.collection('contemporary');
  
        const mockContemporary = [
            {id: "1234", title: "aubrey", genre: "soft-rock", band: "bread"},
            {id: "5678", title: "ctmeoy", genre: "pop", band: "dv"},
            {id: "9101", title: "autumn leaves", genre: "jazz", band: "rw"}
        ]

        await contemporaryCollection.insertMany(mockContemporary);

        const req = {};
        const res = new TestResponse();

        await contemporaryController.getAll(req, res);

        expect(res.statusCode).toBe(200);
        expect(res.data).toEqual(mockContemporary);
    })
})
