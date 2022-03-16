import { FetcherError } from '../../src/errors';

describe('given a FetcherError', () => {
  describe('when getting the message', () => {
    it('should return the message', () => {
      const err = new FetcherError({
        status: 404,
        statusText: 'Not Found',
        body: '',
        url: 'https://example.com/api/v1/hello',
      });

      expect(err.message).toBe('404 Not Found https://example.com/api/v1/hello');
    });
  });
});
