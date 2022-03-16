import { createUrlPath } from '../../../src/openapi';

type PathParam = { article_id: number; comment_id: number };
type QueryParam = { sort: 'asc' | 'desc'; sort_by: string };

describe('createUrlPath', () => {
  it('replaces the path params', () => {
    const value = createUrlPath<PathParam, never>('/articles/{article_id}/comments/{comment_id}', {
      path: {
        article_id: 50,
        comment_id: 10,
      },
    });
    const expected = '/articles/50/comments/10';
    expect(value).toBe(expected);
  });

  it('adds the query params to the url', () => {
    const value = createUrlPath<PathParam, QueryParam>('/articles/{article_id}/comments/{comment_id}', {
      path: { article_id: 50, comment_id: 10 },
      query: { sort: 'asc', sort_by: 'title' },
    });
    const expected = '/articles/50/comments/10?sort=asc&sort_by=title';
    expect(value).toBe(expected);
  });
});
