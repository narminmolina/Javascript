const data = require('./data');
let result0 = data.results[0];
const {
  transformObservation,
  transformObservations,
  transformObservations2
} = require('./observations');

const isUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};

describe('Problem 03 - transformObservation(), transformObservations(), transformObservations2() functions', function () {
  describe('transformObservation() function', function () {
    let sample;

    beforeEach(() => {
      sample = Object.assign({}, result0);
    });

    test('should return an Object', function () {
      let result = transformObservation(sample);
      expect(typeof result).toBe('object');
    });

    test('should return an Object containing an id property', function () {
      let result = transformObservation(sample);
      expect(result.id).toBe(sample.id);
    });

    test('should return an Object containing a speciesGuess property', function () {
      let result = transformObservation(sample);
      expect(result.speciesGuess).toBe(sample.species_guess);
    });

    test('should return an Object containing an isResearchQuality property', function () {
      sample.quality_grade = 'research';
      expect(transformObservation(sample).isResearchQuality).toBe(true);

      sample.quality_grade = 'casual';
      expect(transformObservation(sample).isResearchQuality).toBe(false);
    });

    test('should return an Object containing a.geoCoords Array property', function () {
      let result = transformObservation(sample);
      expect(Array.isArray(result.geoCoords)).toBe(true);
    });

    test('geoCoords Array should include two Numbers', function () {
      sample.location = '43,-72';
      let result = transformObservation(sample);
      expect(result.geoCoords.length).toBe(2);
      expect(typeof result.geoCoords[0]).toBe('number');
      expect(typeof result.geoCoords[1]).toBe('number');
    });

    test('geoCoords Array should be in the form [lng, lat]', function () {
      sample.location = '43,-72';
      let result = transformObservation(sample);
      expect(result.geoCoords[0]).toBe(-72);
      expect(result.geoCoords[1]).toBe(43);
    });

    test('should return an Object containing a user property', function () {
      let result = transformObservation(sample);
      expect(result.user).toBe('@photon_polyphemus');
    });

    test('should return an Object containing a photos Array of URLs', function () {
      let result = transformObservation(sample);
      expect(Array.isArray(result.photoUrls)).toBe(true);
      expect(result.photoUrls.length).toBe(1);
      expect(result.photosCount).toBe(result.photoUrls.length);
      let url = result.photoUrls[0];
      expect(typeof url).toBe('string');
      expect(isUrl(url)).toBe(true);
    });

    test('should return an Object containing a photos Array of multiple URLs', function () {
      const photo = sample.photos[0];
      sample.photos = [photo, photo, photo];

      let result = transformObservation(sample);
      expect(Array.isArray(result.photoUrls)).toBe(true);
      expect(result.photoUrls.length).toBe(3);
      expect(result.photosCount).toBe(3);

      result.photoUrls.forEach((url) => {
        expect(typeof url).toBe('string');
        expect(isUrl(url)).toBe(true);
      });
    });
  });

  describe('transformObservations() function', function () {
    let sample, samples, sampleData;

    beforeEach(() => {
      sample = Object.assign({}, result0);
      samples = [sample];
      sampleData = { results: samples };
    });

    test('should return an Array', function () {
      let result = transformObservations(sampleData);
      expect(Array.isArray(result)).toBe(true);
    });

    test('should return a new Array', function () {
      let result = transformObservations(sampleData);
      expect(Array.isArray(result)).toBe(true);
      expect(result).not.toBe(samples);
    });

    test('should return an Array with the same number of elements', function () {
      let result = transformObservations(sampleData);
      expect(result.length).toBe(samples.length);
    });

    test('should return an Array of Objects', function () {
      let result = transformObservations(sampleData);
      result.forEach((o) => expect(typeof o).toBe('object'));
    });

    test('should return an Array with Objects containing an id property', function () {
      let result = transformObservations(sampleData);
      expect(result[0].id).toBe(samples[0].id);
    });

    test('should return an Object containing a speciesGuess property', function () {
      let result = transformObservations(sampleData);
      expect(result[0].speciesGuess).toBe(sample.species_guess);
    });

    test('should return an Object containing an isResearchQuality property', function () {
      sample.quality_grade = 'research';
      expect(transformObservations(sampleData)[0].isResearchQuality).toBe(true);

      sample.quality_grade = 'casual';
      expect(transformObservations(sampleData)[0].isResearchQuality).toBe(false);
    });

    test('should return an Object containing a.geoCoords Array property', function () {
      let results = transformObservations(sampleData);
      expect(Array.isArray(results[0].geoCoords)).toBe(true);
    });

    test('geoCoords Array should include two Numbers', function () {
      sample.location = '43,-72';
      let results = transformObservations(sampleData);
      expect(results[0].geoCoords.length).toBe(2);
      expect(typeof results[0].geoCoords[0]).toBe('number');
      expect(typeof results[0].geoCoords[1]).toBe('number');
    });

    test('geoCoords Array should be in the form [lng, lat]', function () {
      sample.location = '43,-72';
      let results = transformObservations(sampleData);
      expect(results[0].geoCoords[0]).toBe(-72);
      expect(results[0].geoCoords[1]).toBe(43);
    });

    test('should return an Object containing a user property', function () {
      let results = transformObservations(sampleData);
      expect(results[0].user).toBe('@photon_polyphemus');
    });

    test('should return an Object containing a photoUrls Array of URLs', function () {
      let results = transformObservations(sampleData);
      expect(Array.isArray(results[0].photoUrls)).toBe(true);
      expect(results[0].photoUrls.length).toBe(1);
      let url = results[0].photoUrls[0];
      expect(typeof url).toBe('string');
      expect(isUrl(url)).toBe(true);
    });

    test('should return an Object containing a photos Array of multiple URLs', function () {
      const photo = sample.photos[0];
      sample.photos = [photo, photo, photo];

      let results = transformObservations(sampleData);
      expect(Array.isArray(results[0].photoUrls)).toBe(true);
      expect(results[0].photoUrls.length).toBe(3);

      results[0].photoUrls.forEach((url) => {
        expect(typeof url).toBe('string');
        expect(isUrl(url)).toBe(true);
      });
    });

    test('real-world data should behave the same way as test data', function () {
      expect(transformObservations(data)).toEqual([
        {
          id: 135714728,
          speciesGuess: 'North American Spur-throated Grasshoppers',
          isResearchQuality: false,
          geoCoords: [-79.3578650057, 43.8021070588],
          photoUrls: ['https://static.inaturalist.org/photos/231514179/square.jpeg'],
          photosCount: 1,
          user: '@photon_polyphemus'
        },
        {
          id: 135284910,
          speciesGuess: 'white clover',
          isResearchQuality: true,
          geoCoords: [-79.3552505225, 43.8012107565],
          photoUrls: ['https://static.inaturalist.org/photos/230716266/square.jpeg'],
          photosCount: 1,
          user: '@photon_polyphemus'
        },
        {
          id: 134338548,
          speciesGuess: 'Common Blue',
          isResearchQuality: true,
          geoCoords: [-79.3572242931, 43.8019894562],
          photoUrls: ['https://static.inaturalist.org/photos/228964954/square.jpeg'],
          photosCount: 1,
          user: '@photon_polyphemus'
        },
        {
          id: 134338529,
          speciesGuess: 'butterfly milkweed',
          isResearchQuality: true,
          geoCoords: [-79.3570435792, 43.8018962935],
          photoUrls: ['https://static.inaturalist.org/photos/228964884/square.jpeg'],
          photosCount: 1,
          user: '@photon_polyphemus'
        },
        {
          id: 133949517,
          speciesGuess: 'hawthorns',
          isResearchQuality: false,
          geoCoords: [-79.3536902312, 43.7987008598],
          photoUrls: [
            'https://static.inaturalist.org/photos/228239421/square.jpeg',
            'https://static.inaturalist.org/photos/228239447/square.jpeg',
            'https://static.inaturalist.org/photos/228250557/square.jpeg'
          ],
          photosCount: 3,
          user: '@mohammedmaster'
        },
        {
          id: 132911262,
          speciesGuess: 'Black-crowned Night-Heron',
          isResearchQuality: true,
          geoCoords: [-79.3558164686, 43.8014469325],
          photoUrls: ['https://static.inaturalist.org/photos/226314910/square.jpeg'],
          photosCount: 1,
          user: '@photon_polyphemus'
        },
        {
          id: 132911218,
          speciesGuess: 'Carolina Grasshopper',
          isResearchQuality: true,
          geoCoords: [-79.355892241, 43.8015417898],
          photoUrls: ['https://static.inaturalist.org/photos/226314776/square.jpeg'],
          photosCount: 1,
          user: '@photon_polyphemus'
        },
        {
          id: 130917890,
          speciesGuess: 'Melissodes',
          isResearchQuality: false,
          geoCoords: [-79.3573010713, 43.8021363384],
          photoUrls: [
            'https://inaturalist-open-data.s3.amazonaws.com/photos/222713316/square.jpeg',
            'https://inaturalist-open-data.s3.amazonaws.com/photos/222713332/square.jpeg'
          ],
          photosCount: 2,
          user: '@tttly422'
        },
        {
          id: 130166945,
          speciesGuess: 'Common Eastern Bumble Bee',
          isResearchQuality: true,
          geoCoords: [-79.3582705958, 43.7972570983],
          photoUrls: [
            'https://inaturalist-open-data.s3.amazonaws.com/photos/221321164/square.jpg',
            'https://inaturalist-open-data.s3.amazonaws.com/photos/221321192/square.jpg',
            'https://inaturalist-open-data.s3.amazonaws.com/photos/221321213/square.jpg'
          ],
          photosCount: 3,
          user: '@lchung'
        },
        {
          id: 129458579,
          speciesGuess: null,
          isResearchQuality: false,
          geoCoords: [-79.3558959961, 43.7987823486],
          photoUrls: [
            'https://inaturalist-open-data.s3.amazonaws.com/photos/220004513/square.jpeg'
          ],
          photosCount: 1,
          user: '@mizo444'
        },
        {
          id: 129335776,
          speciesGuess: 'false sunflower',
          isResearchQuality: false,
          geoCoords: [-79.3530031666, 43.7873579828],
          photoUrls: [
            'https://inaturalist-open-data.s3.amazonaws.com/photos/219779056/square.jpeg'
          ],
          photosCount: 1,
          user: '@cwisniow'
        },
        {
          id: 129335669,
          speciesGuess: 'goldenrods',
          isResearchQuality: false,
          geoCoords: [-79.3530031666, 43.7873579828],
          photoUrls: [
            'https://inaturalist-open-data.s3.amazonaws.com/photos/219778811/square.jpeg'
          ],
          photosCount: 1,
          user: '@cwisniow'
        },
        {
          id: 129335485,
          speciesGuess: 'sunflowers, daisies, asters, and allies',
          isResearchQuality: false,
          geoCoords: [-79.3530031666, 43.7873579828],
          photoUrls: [
            'https://inaturalist-open-data.s3.amazonaws.com/photos/219778384/square.jpeg'
          ],
          photosCount: 1,
          user: '@cwisniow'
        },
        {
          id: 129335357,
          speciesGuess: 'northern catalpa',
          isResearchQuality: true,
          geoCoords: [-79.3530031666, 43.7873579828],
          photoUrls: [
            'https://inaturalist-open-data.s3.amazonaws.com/photos/219778025/square.jpeg'
          ],
          photosCount: 1,
          user: '@cwisniow'
        },
        {
          id: 128296780,
          speciesGuess: 'false shamrock',
          isResearchQuality: false,
          geoCoords: [-79.352121, 43.7947699],
          photoUrls: ['https://static.inaturalist.org/photos/217910998/square.jpeg'],
          photosCount: 1,
          user: '@mohammedmaster'
        },
        {
          id: 128068294,
          speciesGuess: 'green ash',
          isResearchQuality: false,
          geoCoords: [-79.354407303, 43.8009244887],
          photoUrls: [
            'https://static.inaturalist.org/photos/217499052/square.jpeg',
            'https://static.inaturalist.org/photos/217499077/square.jpeg'
          ],
          photosCount: 2,
          user: '@photon_polyphemus'
        },
        {
          id: 127822137,
          speciesGuess: 'Black Swallowtail',
          isResearchQuality: true,
          geoCoords: [-79.3569138274, 43.80206689],
          photoUrls: [
            'https://inaturalist-open-data.s3.amazonaws.com/photos/217047786/square.jpeg',
            'https://inaturalist-open-data.s3.amazonaws.com/photos/217047804/square.jpeg',
            'https://inaturalist-open-data.s3.amazonaws.com/photos/217047816/square.jpeg'
          ],
          photosCount: 3,
          user: '@tttly422'
        },
        {
          id: 127769862,
          speciesGuess: 'Piping Plover',
          isResearchQuality: true,
          geoCoords: [-79.3491735122, 43.7981152296],
          photoUrls: ['https://static.inaturalist.org/photos/216950149/square.jpg'],
          photosCount: 1,
          user: '@chloevietnu'
        },
        {
          id: 126743568,
          speciesGuess: 'Monarch',
          isResearchQuality: true,
          geoCoords: [-79.3476825437, 43.7928163915],
          photoUrls: [
            'https://inaturalist-open-data.s3.amazonaws.com/photos/215101202/square.jpeg'
          ],
          photosCount: 1,
          user: '@erotavlas'
        },
        {
          id: 125345969,
          speciesGuess: null,
          isResearchQuality: false,
          geoCoords: [-79.3556968589, 43.8013390638],
          photoUrls: ['https://inaturalist-open-data.s3.amazonaws.com/photos/212557269/square.jpg'],
          photosCount: 1,
          user: '@mark_1974'
        }
      ]);
    });
  });

  describe('transformObservations2() function', function () {
    let sample, samples, sampleData;

    beforeEach(() => {
      sample = Object.assign({}, result0);
      samples = [sample];
      sampleData = { results: samples };
    });

    test('should return an Array', function () {
      let result = transformObservations2(sampleData);
      expect(Array.isArray(result)).toBe(true);
    });

    test('should return a new Array', function () {
      let result = transformObservations2(sampleData);
      expect(Array.isArray(result)).toBe(true);
      expect(result).not.toBe(samples);
    });

    test('should return an Array with the same number of elements', function () {
      let result = transformObservations2(sampleData);
      expect(result.length).toBe(samples.length);
    });

    test('should return an Array of Objects', function () {
      let result = transformObservations2(sampleData);
      result.forEach((o) => expect(typeof o).toBe('object'));
    });

    test('should return an Array with Objects containing an id property', function () {
      let result = transformObservations2(sampleData);
      expect(result[0].id).toBe(samples[0].id);
    });

    test('should return an Object containing a speciesGuess property', function () {
      let result = transformObservations2(sampleData);
      expect(result[0].speciesGuess).toBe(sample.species_guess);
    });

    test('should return an Object containing an isResearchQuality property', function () {
      sample.quality_grade = 'research';
      expect(transformObservations2(sampleData)[0].isResearchQuality).toBe(true);

      sample.quality_grade = 'casual';
      expect(transformObservations2(sampleData)[0].isResearchQuality).toBe(false);
    });

    test('should return an Object containing a geoCoords Array property', function () {
      let results = transformObservations2(sampleData);
      expect(Array.isArray(results[0].geoCoords)).toBe(true);
    });

    test('geoCoords Array should include two Numbers', function () {
      sample.location = '43,-72';
      let results = transformObservations2(sampleData);
      expect(results[0].geoCoords.length).toBe(2);
      expect(typeof results[0].geoCoords[0]).toBe('number');
      expect(typeof results[0].geoCoords[1]).toBe('number');
    });

    test('geoCoords Array should be in the form [lng, lat]', function () {
      sample.location = '43,-72';
      let results = transformObservations2(sampleData);
      expect(results[0].geoCoords[0]).toBe(-72);
      expect(results[0].geoCoords[1]).toBe(43);
    });

    test('should return an Object containing a user property', function () {
      let results = transformObservations2(sampleData);
      expect(results[0].user).toBe('@photon_polyphemus');
    });

    test('should return an Object containing a photos Array of URLs', function () {
      let results = transformObservations2(sampleData);
      expect(Array.isArray(results[0].photoUrls)).toBe(true);
      expect(results[0].photoUrls.length).toBe(1);
      let url = results[0].photoUrls[0];
      expect(typeof url).toBe('string');
      expect(isUrl(url)).toBe(true);
    });

    test('should return an Object containing a photos Array of multiple URLs', function () {
      const photo = sample.photos[0];
      sample.photos = [photo, photo, photo];

      let results = transformObservations2(sampleData);
      expect(Array.isArray(results[0].photoUrls)).toBe(true);
      expect(results[0].photoUrls.length).toBe(3);

      results[0].photoUrls.forEach((url) => {
        expect(typeof url).toBe('string');
        expect(isUrl(url)).toBe(true);
      });
    });

    test('real-world data should behave the same way as test data', function () {
      expect(transformObservations2(data)).toEqual([
        {
          id: 135714728,
          speciesGuess: 'North American Spur-throated Grasshoppers',
          isResearchQuality: false,
          geoCoords: [-79.3578650057, 43.8021070588],
          photoUrls: ['https://static.inaturalist.org/photos/231514179/square.jpeg'],
          photosCount: 1,
          user: '@photon_polyphemus'
        },
        {
          id: 135284910,
          speciesGuess: 'white clover',
          isResearchQuality: true,
          geoCoords: [-79.3552505225, 43.8012107565],
          photoUrls: ['https://static.inaturalist.org/photos/230716266/square.jpeg'],
          photosCount: 1,
          user: '@photon_polyphemus'
        },
        {
          id: 134338548,
          speciesGuess: 'Common Blue',
          isResearchQuality: true,
          geoCoords: [-79.3572242931, 43.8019894562],
          photoUrls: ['https://static.inaturalist.org/photos/228964954/square.jpeg'],
          photosCount: 1,
          user: '@photon_polyphemus'
        },
        {
          id: 134338529,
          speciesGuess: 'butterfly milkweed',
          isResearchQuality: true,
          geoCoords: [-79.3570435792, 43.8018962935],
          photoUrls: ['https://static.inaturalist.org/photos/228964884/square.jpeg'],
          photosCount: 1,
          user: '@photon_polyphemus'
        },
        {
          id: 133949517,
          speciesGuess: 'hawthorns',
          isResearchQuality: false,
          geoCoords: [-79.3536902312, 43.7987008598],
          photoUrls: [
            'https://static.inaturalist.org/photos/228239421/square.jpeg',
            'https://static.inaturalist.org/photos/228239447/square.jpeg',
            'https://static.inaturalist.org/photos/228250557/square.jpeg'
          ],
          photosCount: 3,
          user: '@mohammedmaster'
        },
        {
          id: 132911262,
          speciesGuess: 'Black-crowned Night-Heron',
          isResearchQuality: true,
          geoCoords: [-79.3558164686, 43.8014469325],
          photoUrls: ['https://static.inaturalist.org/photos/226314910/square.jpeg'],
          photosCount: 1,
          user: '@photon_polyphemus'
        },
        {
          id: 132911218,
          speciesGuess: 'Carolina Grasshopper',
          isResearchQuality: true,
          geoCoords: [-79.355892241, 43.8015417898],
          photoUrls: ['https://static.inaturalist.org/photos/226314776/square.jpeg'],
          photosCount: 1,
          user: '@photon_polyphemus'
        },
        {
          id: 130917890,
          speciesGuess: 'Melissodes',
          isResearchQuality: false,
          geoCoords: [-79.3573010713, 43.8021363384],
          photoUrls: [
            'https://inaturalist-open-data.s3.amazonaws.com/photos/222713316/square.jpeg',
            'https://inaturalist-open-data.s3.amazonaws.com/photos/222713332/square.jpeg'
          ],
          photosCount: 2,
          user: '@tttly422'
        },
        {
          id: 130166945,
          speciesGuess: 'Common Eastern Bumble Bee',
          isResearchQuality: true,
          geoCoords: [-79.3582705958, 43.7972570983],
          photoUrls: [
            'https://inaturalist-open-data.s3.amazonaws.com/photos/221321164/square.jpg',
            'https://inaturalist-open-data.s3.amazonaws.com/photos/221321192/square.jpg',
            'https://inaturalist-open-data.s3.amazonaws.com/photos/221321213/square.jpg'
          ],
          photosCount: 3,
          user: '@lchung'
        },
        {
          id: 129458579,
          speciesGuess: null,
          isResearchQuality: false,
          geoCoords: [-79.3558959961, 43.7987823486],
          photoUrls: [
            'https://inaturalist-open-data.s3.amazonaws.com/photos/220004513/square.jpeg'
          ],
          photosCount: 1,
          user: '@mizo444'
        },
        {
          id: 129335776,
          speciesGuess: 'false sunflower',
          isResearchQuality: false,
          geoCoords: [-79.3530031666, 43.7873579828],
          photoUrls: [
            'https://inaturalist-open-data.s3.amazonaws.com/photos/219779056/square.jpeg'
          ],
          photosCount: 1,
          user: '@cwisniow'
        },
        {
          id: 129335669,
          speciesGuess: 'goldenrods',
          isResearchQuality: false,
          geoCoords: [-79.3530031666, 43.7873579828],
          photoUrls: [
            'https://inaturalist-open-data.s3.amazonaws.com/photos/219778811/square.jpeg'
          ],
          photosCount: 1,
          user: '@cwisniow'
        },
        {
          id: 129335485,
          speciesGuess: 'sunflowers, daisies, asters, and allies',
          isResearchQuality: false,
          geoCoords: [-79.3530031666, 43.7873579828],
          photoUrls: [
            'https://inaturalist-open-data.s3.amazonaws.com/photos/219778384/square.jpeg'
          ],
          photosCount: 1,
          user: '@cwisniow'
        },
        {
          id: 129335357,
          speciesGuess: 'northern catalpa',
          isResearchQuality: true,
          geoCoords: [-79.3530031666, 43.7873579828],
          photoUrls: [
            'https://inaturalist-open-data.s3.amazonaws.com/photos/219778025/square.jpeg'
          ],
          photosCount: 1,
          user: '@cwisniow'
        },
        {
          id: 128296780,
          speciesGuess: 'false shamrock',
          isResearchQuality: false,
          geoCoords: [-79.352121, 43.7947699],
          photoUrls: ['https://static.inaturalist.org/photos/217910998/square.jpeg'],
          photosCount: 1,
          user: '@mohammedmaster'
        },
        {
          id: 128068294,
          speciesGuess: 'green ash',
          isResearchQuality: false,
          geoCoords: [-79.354407303, 43.8009244887],
          photoUrls: [
            'https://static.inaturalist.org/photos/217499052/square.jpeg',
            'https://static.inaturalist.org/photos/217499077/square.jpeg'
          ],
          photosCount: 2,
          user: '@photon_polyphemus'
        },
        {
          id: 127822137,
          speciesGuess: 'Black Swallowtail',
          isResearchQuality: true,
          geoCoords: [-79.3569138274, 43.80206689],
          photoUrls: [
            'https://inaturalist-open-data.s3.amazonaws.com/photos/217047786/square.jpeg',
            'https://inaturalist-open-data.s3.amazonaws.com/photos/217047804/square.jpeg',
            'https://inaturalist-open-data.s3.amazonaws.com/photos/217047816/square.jpeg'
          ],
          photosCount: 3,
          user: '@tttly422'
        },
        {
          id: 127769862,
          speciesGuess: 'Piping Plover',
          isResearchQuality: true,
          geoCoords: [-79.3491735122, 43.7981152296],
          photoUrls: ['https://static.inaturalist.org/photos/216950149/square.jpg'],
          photosCount: 1,
          user: '@chloevietnu'
        },
        {
          id: 126743568,
          speciesGuess: 'Monarch',
          isResearchQuality: true,
          geoCoords: [-79.3476825437, 43.7928163915],
          photoUrls: [
            'https://inaturalist-open-data.s3.amazonaws.com/photos/215101202/square.jpeg'
          ],
          photosCount: 1,
          user: '@erotavlas'
        },
        {
          id: 125345969,
          speciesGuess: null,
          isResearchQuality: false,
          geoCoords: [-79.3556968589, 43.8013390638],
          photoUrls: ['https://inaturalist-open-data.s3.amazonaws.com/photos/212557269/square.jpg'],
          photosCount: 1,
          user: '@mark_1974'
        }
      ]);
    });
  });
});
