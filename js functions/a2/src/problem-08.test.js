const { extractUserLogins, extractUserLogins2 } = require('./observations');
const data = require('./data');
const result0 = data.results[0];
const result1 = data.results[4];

describe('extractUserLogins() and extractUserLogins2', () => {
  [extractUserLogins, extractUserLogins2].forEach((fn) => {
    test('should return a single result', () => {
      expect(fn({ results: [result0] })).toEqual(['photon_polyphemus']);
    });

    test('extractUserLogins should not return duplicates', () => {
      expect(fn({ results: [result0, result0, result1] })).toEqual([
        'photon_polyphemus',
        'mohammedmaster'
      ]);
    });

    test('extractUserLogins should work on real data', () => {
      expect(fn(data)).toEqual([
        'photon_polyphemus',
        'mohammedmaster',
        'tttly422',
        'lchung',
        'mizo444',
        'cwisniow',
        'chloevietnu',
        'erotavlas',
        'mark_1974'
      ]);
    });
  });
});
