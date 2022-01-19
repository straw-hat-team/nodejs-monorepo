import { replaceDynamicPathParams } from '../../src/openapi';

describe('given "replaceDynamicPathParams" function', () => {
  describe('when replacing all the dynamic path params', () => {
    it('then replaces all the dynamic path params', () => {
      const path = '/api/v1/users/{userId}/{articleId}';
      const params = {
        userId: '123',
        articleId: '456',
      };
      const result = replaceDynamicPathParams(path, params);
      expect(result).toEqual('/api/v1/users/123/456');
    });
  });
  describe('when replacing some dynamic path params', () => {
    it('then only replaces the dynamic path params defined', () => {
      const path = '/api/v1/users/{userId}/{articleId}';
      const params = {
        userId: '123',
      };
      const result = replaceDynamicPathParams(path, params);
      expect(result).toEqual('/api/v1/users/123/{articleId}');
    });
  });
});
