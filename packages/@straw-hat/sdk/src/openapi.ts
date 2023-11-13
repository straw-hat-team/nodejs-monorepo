/**
 * Given an operation path from OpenAPI spec, returns the path with the replaced
 * dynamic parameters.
 * @param operationPath
 * @param pathParams
 */
export function replaceDynamicPathParams(operationPath: string, pathParams: Record<string, any> = {}) {
  return Object.entries(pathParams).reduce(
    (theUrlPath, [name, value]) => theUrlPath.replaceAll(`{${name}}`, value),
    operationPath,
  );
}
