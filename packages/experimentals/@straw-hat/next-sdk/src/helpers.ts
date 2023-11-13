import type { ComponentType } from 'react';
import type { UrlObject, UrlQuery } from './types';

export function wrapDisplayName(component: ComponentType, hocName: string) {
  return `${hocName}(${getDisplayName(component)})`;
}

function getDisplayName(component: ComponentType) {
  return component.displayName ?? component.name ?? 'Unknown';
}

/**
 * Create a URL creator, adding strong typing and removing the needs to
 * memorize the pathname.
 *
 * @param pathname the pathname from the URL.
 */
export function makeUrlFor<TPath extends Record<string, any> = never, TQuery extends UrlQuery = never>(
  pathname: string,
) {
  return function (args: { path: TPath; query: TQuery }): UrlObject<TQuery> {
    return {
      query: args.query,
      pathname: replacePathParams(pathname, args.path),
    };
  };
}

function replacePathParams(urlPath: string, pathParams: Record<string, any> = {}) {
  return Object.entries(pathParams).reduce(
    (theUrlPath, [name, value]) => theUrlPath.replaceAll(`{${name}}`, value),
    urlPath,
  );
}
