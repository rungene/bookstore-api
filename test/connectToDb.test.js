const { expect } = require('chai');
const sinon = require('sinon');
const { connectToDb } = require('../db');
const { MongoClient } = require('mongodb');

describe('connectToDb()', function() {
  let connectStub;

  beforeEach(function() {
    connectStub = sinon.stub(MongoClient, 'connect');
  }); 

  afterEach(function() {
    sinon.restore();
  }); 

  it('should connect to the database and call the callback on success', function(done) {
    // mock db object
    const mockDb = {}; 
    // mock client with db method
    const mockClient = { db: sinon.stub().returns(mockDb) };
    connectStub.resolves(mockClient);
    
    connectToDb((err) => {
      try {
        console.log('Success Case Error:', err);
        console.log('Error:', err);
        expect(err).to.be.undefined;
        done();
      } catch (error) {
        done(error);
      }   
    }); 
  }); 

  it('should call the callback with an error on connection failure', function(done) {
    const expectedError = new Error('Connection failed');
    connectStub.rejects(expectedError);

    connectToDb((err) => {
      try {
        console.log('Failure Case Error', err);
        expect(err).to.equal(expectedError);
        done();
      } catch (error) {
        done(error);
      }   
    }); 
  }); 
});
