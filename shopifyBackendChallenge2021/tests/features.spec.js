const request = require('supertest')
const app = require('../app.js')
const {MongoClient} = require('mongodb');
jest.setTimeout(10000)
describe('Basic test cases for DB Queries & Endpoint Security', () => {
  let connection;
  let db;
  const connectionString = "mongodb+srv://Tester:Password123@cluster0.8oi2y.mongodb.net/test?retryWrites=true&w=majority"

  beforeAll(async () => {
    connection = await MongoClient.connect(connectionString, {
      useNewUrlParser: true,
    });
    db = await connection.db('backend-challenge')
  });

  it('should create a new user & be able to find newly created user in collection.', async () => {
    const users = db.collection('users');
    const mockUser = {name: 'some-user-id', password: 'John'};
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({name: 'some-user-id'});

    expect(insertedUser.name).toEqual(mockUser.name);
    expect(insertedUser.password).toEqual(mockUser.password);
  })

  it('/gallery should not be accessible by non authenticated users.', async () => {
    const res = await request(app)
      .get('/gallery')
      .send()
    expect(res.statusCode).toEqual(403)
  })

  it('/myimages should not be accessible by non authenticated users.', async () => {
    const res = await request(app)
      .get('/myimages')
      .send()
    expect(res.statusCode).toEqual(403)
  })

  it('/viewPortal should not be accessible by non authenticated users.', async () => {
    const res = await request(app)
      .get('/viewPortal')
      .send()
    expect(res.statusCode).toEqual(403)
  })
})