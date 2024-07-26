process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const { MongoClient } = require('mongodb');
const { expect } = chai;

chai.use(chaiHttp);
let db
const testUri = `${process.env.LOCAL_TEST_URI}`;
const testCollection = 'books';

before(async function () {
  const client = await MongoClient.connect(testUri, { useNewUrlParser: true, useUnifiedTopology: true });
  db = client.db();
  app.locals.db = db;
});

describe('Book API Endpoints', function() {
  beforeEach(async function() {
    await db.collection(testCollection).deleteMany({});
  });

  describe('GET /books', function() {
    it('should get all books', async function() {
      await db.collection('books').insertMany([
        { title: 'Book 1', author: 'Author 1' },
        { title: 'Book 2', author: 'Author 2' }
      ]);

      const res = await chai.request(app).get('/books');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array').with.length(2);
    });
  });

  describe('Get /books/:id', function() {
    it('should get a book by id', async function() {
      const book = { title: 'Book 1', author: 'Author 1' };
      const { insertedId } = await db.collection(testCollection).insertOne(book);

      const res = await chai.request(app).get(`/books/${insertedId}`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('_id').that.equals(insertedId.toString());
      expect(res.body).to.have.property('title', 'Book 1');
      expect(res.body).to.have.property('author', 'Author 1');
    });

    it('should return 500 for an invalid id', async function() {
      const inValidId = 123;

      const res = await chai.request(app).get(`/books/${inValidId}`);

      expect(res).to.have.status(500);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('error').that.equals('Not valid document id');
    });
  });

  describe('POST /books', function() {
    it('should create a new book', async function() {
      const book = { title: 'Book 1', author: 'Author 1' };

      const res = await chai.request(app).post('/books').send(book);

      expect(res).to.have.status(201);
      expect(res.body).to.have.property('insertedId');
    });
  });

  describe('DELETE /books/:id', function() {
    it('should delete a book by id', async function() {
      const book = { title: 'Book 1', author: 'Author 1' };
      const { insertedId } = await db.collection(testCollection).insertOne(book);

      const res = await chai.request(app).delete(`/books/${insertedId}`);
      expect(res).to.have.status(200);
    });
    it('should return 500 for an invalid id', async function() {
      const inValidId = 123;
      const res = await chai.request(app).delete(`/books/${inValidId}`);

      expect(res).to.have.status(500);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('error').that.equals('Not valid document id');
    });
  });
  
  describe('PATCH /books/:id', function() {
    it('should update a book by id', async function() {
      const book = { title: 'Book 1', author: 'Author 1' };
      const { insertedId } = await db.collection(testCollection).insertOne(book);
      const updates = { title: 'Updated Book' };

      const res = await chai.request(app).patch(`/books/${insertedId}`).send(updates);
      expect(res).to.have.status(200);
    });

    it('should return 500 for an invalid id', async function() {
      const inValidId = 123;
      const res = await chai.request(app).patch(`/books/${inValidId}`).send({ title: 'Updated Book' });

      expect(res).to.have.status(500);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('error').that.equals('Not valid document id');
    });
  });
});
