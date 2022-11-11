/* eslint-disable jest/expect-expect */
const data = require('./data');
const { getObservationsByPositionalAccuracy } = require('./observations');

describe('Problem 05 - getObservationsByPositionalAccuracy() function', function () {
  function expectSuitableArray(value, expectedLength) {
    expect(Array.isArray(value)).toBe(true);
    expect(value.length).toBe(expectedLength);
  }

  test('missing options object returns same Array as original', function () {
    let results = getObservationsByPositionalAccuracy(data);
    expect(results).toEqual(data.results);
  });

  test('empty options object returns same Array as original', function () {
    let results = getObservationsByPositionalAccuracy(data, {});
    expect(results).toEqual(data.results);
  });

  test('equal value returns an Array of expected results', function () {
    let results = getObservationsByPositionalAccuracy(data, { equal: 1701 });
    expectSuitableArray(results, 3);
    results.forEach((result) => expect(result.positional_accuracy).toBe(1701));
  });

  test('equal with unknown value returns an empty Array', function () {
    let results = getObservationsByPositionalAccuracy(data, { equal: 406 });
    expectSuitableArray(results, 0);
  });

  test('greaterThan value returns an Array of expected results', function () {
    let results = getObservationsByPositionalAccuracy(data, { greaterThan: 100 });
    expectSuitableArray(results, 11);
    results.forEach((result) => expect(result.positional_accuracy).toBeGreaterThan(100));
  });

  test('greaterThan value larger than largest known returns an empty Array', function () {
    let results = getObservationsByPositionalAccuracy(data, { greaterThan: 1800 });
    expectSuitableArray(results, 0);
  });

  test('lessThan value returns an Array of expected results', function () {
    let results = getObservationsByPositionalAccuracy(data, { lessThan: 100 });
    expectSuitableArray(results, 8);
    results.forEach((result) => expect(result.positional_accuracy).toBeLessThan(100));
  });

  test('lessThan value smaller than smallest known returns an empty Array', function () {
    let results = getObservationsByPositionalAccuracy(data, { lessThan: 1 });
    expectSuitableArray(results, 0);
  });

  test('greaterThan and lessThan values together return an Array of expected results', function () {
    let results = getObservationsByPositionalAccuracy(data, { greaterThan: 100, lessThan: 200 });
    expectSuitableArray(results, 3);
    results.forEach((result) => {
      expect(result.positional_accuracy).toBeLessThan(200);
      expect(result.positional_accuracy).toBeGreaterThan(100);
    });
  });

  test('greaterThan and lessThan values too close together return an empty Array', function () {
    let results = getObservationsByPositionalAccuracy(data, { greaterThan: 100, lessThan: 100 });
    expectSuitableArray(results, 0);
  });

  test('equal is used over gte/lte if all are present', function () {
    let results = getObservationsByPositionalAccuracy(data, {
      equal: 201,
      greaterThan: 1,
      lessThan: 100
    });
    expectSuitableArray(results, 2);
    results.forEach((result) => expect(result.positional_accuracy).toBe(201));
  });
});
