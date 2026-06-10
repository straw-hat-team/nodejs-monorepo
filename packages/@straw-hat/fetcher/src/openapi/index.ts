export type PathParam<T> = [T] extends [never] ? {} : { path: T };
export type QueryParam<T> = [T] extends [never] ? {} : { query: T };
export type BodyParam<T> = [T] extends [never] ? {} : { body: T };
export type OptionsParam = { options?: { signal?: AbortSignal } };

export type UrlParams<TPath = unknown, TQuery = unknown> = PathParam<TPath> & QueryParam<TQuery>;

export type OperationParams<TPath = unknown, TQuery = unknown, TBody = unknown> = OptionsParam &
  UrlParams<TPath, TQuery> &
  BodyParam<TBody>;

export function replacePathParams(urlPath: string, pathParams: Record<string, any> = {}) {
  return Object.entries(pathParams).reduce(
    (theUrlPath, [name, value]) => theUrlPath.replaceAll(`{${name}}`, value),
    urlPath,
  );
}

function addQueryParams(urlPath: string, queryParams: Record<any, any>) {
  const searchParams = new URLSearchParams(queryParams);
  return `${urlPath}?${searchParams.toString()}`;
}

export function createUrlPath<TPath, TQuery>(urlPath: string, params: UrlParams<TPath, TQuery>) {
  // @ts-ignore TODO: Not sure how to fix the problem with `never` type being a possibility
  const normalizedPath = replacePathParams(urlPath, params.path);
  // @ts-ignore TODO: Not sure how to fix the problem with `never` type being a possibility
  return params.query ? addQueryParams(normalizedPath, params.query) : normalizedPath;
}
