const data = require('./data');
const { observationsByPrivacy } = require('./observations');

describe('Problem 02 - observationsByPrivacy()', function () {
  test('should throw if privacy is not one of the expected values', function () {
    // undefined
    expect(() => observationsByPrivacy(data)).toThrow();
    // number
    expect(() => observationsByPrivacy(data, 3)).toThrow();
    // boolean
    expect(() => observationsByPrivacy(data, true)).toThrow();
    // unknown string
    expect(() => observationsByPrivacy(data, 'unknown')).toThrow();
    // spelling mistake string
    expect(() => observationsByPrivacy(data, 'oppen')).toThrow();
  });

  test('should include the expected objects for a privacy = hidden', function () {
    const hidden = observationsByPrivacy(data, 'hidden');

    expect(hidden.length).toBe(3);
    hidden.forEach((observation) => {
      expect(typeof observation).toBe('object');
      expect(observation.geoprivacy).toBe('hidden');
    });
  });

  test('should include the expected objects for a privacy = HIDDEN', function () {
    const hidden = observationsByPrivacy(data, 'HIDDEN');

    expect(hidden.length).toBe(3);
    hidden.forEach((observation) => {
      expect(typeof observation).toBe('object');
      expect(observation.geoprivacy).toBe('hidden');
    });
  });

  test('should include the expected objects for a privacy = null', function () {
    const hidden = observationsByPrivacy(data, null);

    expect(hidden.length).toBe(17);
    hidden.forEach((observation) => {
      expect(typeof observation).toBe('object');
      expect(observation.geoprivacy).toBe(null);
    });
  });

  test('should return expected Array if data contains strings and null', function () {
    const mixedResults = {
      results: [
        { geoprivacy: 'hidden' },
        { geoprivacy: null },
        { geoprivacy: 'open' },
        { geoprivacy: 'hidden' }
      ]
    };
    const hidden = observationsByPrivacy(mixedResults, 'hidden');
    expect(hidden.length).toBe(2);
    hidden.forEach((observation) => {
      expect(typeof observation).toBe('object');
      expect(observation.geoprivacy).toBe('hidden');
    });
  });
});
