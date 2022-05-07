export function whenInject(condition: boolean, content: string, otherwise: string = '') {
  return condition ? content : otherwise;
}
