# OpenAPI

We ship some useful functions that it may help you when you are following
`OpenAPIv3` specification.

```ts
import { createUrlPath, replacePathParams } from '@straw-hat/fetcher/dist/openapi';

// The following function is useful for replacing {path_param_name} from an
// string
replacePathParams('/users/{user_id}', { user_id: '123' });
// Outputs: /users/123

// The following function is useful for creating string mainly being the
// operation path in your spec, and adds the query params as well.
createUrlPath('/articles/{article_id}/comments/{comment_id}', {
  path: { article_id: 50, comment_id: 10 },
  query: { sort: 'asc', sort_by: 'title' },
});
// Outputs: '/articles/50/comments/10?sort=asc&sort_by=title';
```
