const chai = require('chai');
const { expect } = require('chai');

const { generateIntrID, generateUserID, generateTweetID, tweetIsAd, friendlyInter, generateTimestamp } = require('./../server/helperFunctions/dataGeneration');

// generateIntroID
describe('generateIntrID', () => {
  it('should return a string', () => {
    const id = generateIntrID();

    expect(id).to.be.a('string');
  });
});

// generateUserID
describe('generateUserID', () => {
  it('should return a number', () => {
    const id = generateUserID();

    expect(id).to.be.a('number');
  });

  it('should be less than 10 million', () => {
    const id = generateUserID();

    expect(id).to.be.at.most(10000000);
  });
});

// generateTweetID
describe('generateTweetID', () => {
  it('should return a string', () => {
    const id = generateTweetID();

    expect(id).to.be.a('string');
  });

  it('should have a length of 10', () => {
    const id = generateTweetID();

    expect(id).to.have.lengthOf(10);
  });
});

// tweetIsAd
describe('tweetIsAd', () => {
  it('should return a boolean', () => {
    expect(tweetIsAd()).to.be.a('boolean');
  });
});

// friendlyInter
describe('friendlyInter', () => {
  it('should return a boolean', () => {
    expect(friendlyInter()).to.be.a('boolean');
  });
});

// generateTimestamp
describe('generateTimestamp', () => {
  it(`should return a number between 1513196237428 and ${1513196237428 + 7776000000}`, () => {
    expect(generateTimestamp()).to.be.at.least(1513196237428);
    expect(generateTimestamp()).to.be.at.most(1513196237428 + 7776000000);
  });
});
