const data = require('./data');
const result0 = data.results[0];
const result1 = data.results[1];
const { getUserStats } = require('./observations');

describe('Problem 07 - getUserStats() function', function () {
  let samples, sampleData;

  beforeEach(() => {
    samples = [result0, result1];
    sampleData = { results: samples };
  });

  test('should return an Object with the right properties', function () {
    let result = getUserStats(sampleData);
    expect(typeof result === 'object').toBe(true);
    expect(typeof result.count === 'number').toBe(true);
    expect(typeof result.totals === 'object').toBe(true);
    expect(typeof result.totals.observations === 'number').toBe(true);
    expect(typeof result.totals.journals === 'number').toBe(true);
    expect(typeof result.totals.species === 'number').toBe(true);
    expect(typeof result.averages === 'object').toBe(true);
    expect(typeof result.averages.observations === 'number').toBe(true);
    expect(typeof result.averages.journals === 'number').toBe(true);
    expect(typeof result.averages.species === 'number').toBe(true);
  });

  test('should return an Object with correct count properties', function () {
    let result = getUserStats(sampleData);
    expect(result.count).toBe(samples.length);

    let result2 = getUserStats({ results: samples });
    expect(result2.count).toBe(samples.length);
  });

  test('should return an Object with correct totals', function () {
    let result = getUserStats(sampleData);
    expect(result.count).toBe(samples.length);
    expect(result.totals.observations).toBe(3786);
    expect(result.totals.journals).toBe(68);
    expect(result.totals.species).toBe(1602);
  });

  test('should return an Object with correct averages', function () {
    let result = getUserStats(sampleData);
    expect(result.count).toBe(samples.length);
    expect(result.averages.observations).toBe(1893);
    expect(result.averages.journals).toBe(34);
    expect(result.averages.species).toBe(801);
  });

  test('real-data should produce the expected stats Object', function () {
    let result = getUserStats(data);
    expect(result).toEqual({
      averages: { journals: 3.4, observations: 772.9, species: 351.3 },
      count: 20,
      totals: { journals: 68, observations: 15458, species: 7026 }
    });
  });
});
