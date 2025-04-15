const classicalController = require('../controller/classicalController');
const mongodb = require('../data/database');
const {MongoClient} = require('mongodb');
const TestResponse = require('./test-response');

jest.mock('../data/database', () => ({
    ...jest.requireActual('../data/database'),
    dbase: jest.fn()
}));

describe('testing classicalController', () => {
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
        await db.collection('classical').deleteMany({});

    });

    it('get all classical music documents', async () => {
        const classicalCollection = db.collection('classical');
  
        const mockClassical = [
            {id: "1234", form: "nocturne", composer: "chopin", period: "romantic"},
            {id: "5678", form: "etude", composer: "lizst", period: "romantic"},
            {id: "9101", form: "sonata", composer: "beethoven", period: "classical"}
        ]

        await classicalCollection.insertMany(mockClassical);

        const req = {};
        const res = new TestResponse();

        await classicalController.getAll(req, res);

        expect(res.statusCode).toBe(200);
        expect(res.data).toEqual(mockClassical);
    })
})
