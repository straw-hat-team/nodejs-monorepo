import { replaceDynamicPathParams } from '../../src/openapi';

describe('given a "replaceDynamicPathParams" function', () => {
  describe('when replacing all the dynamic path params', () => {
    it('then replaces all the dynamic path params', () => {
      // GIVEN
      const path = '/api/v1/users/{userId}/{articleId}';
      const params = {
        userId: '123',
        articleId: '456',
      };
      // WHEN
      const result = replaceDynamicPathParams(path, params);
      // THEN
      expect(result).toEqual('/api/v1/users/123/456');
    });
  });
  describe('when replacing some dynamic path params', () => {
    it('then only replaces the dynamic path params defined', () => {
      // GIVEN
      const path = '/api/v1/users/{userId}/{articleId}';
      const params = {
        userId: '123',
      };
      // WHEN
      const result = replaceDynamicPathParams(path, params);
      // THEN
      expect(result).toEqual('/api/v1/users/123/{articleId}');
    });
  });
});
