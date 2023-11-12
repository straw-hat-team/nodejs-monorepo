// @ts-expect-error
declare module '*.svg' {
  // @ts-expect-error
  import type { FunctionComponent, SVGProps } from 'react';
  const ReactComponent: FunctionComponent<SVGProps<SVGSVGElement>>;
  const src: string;
  export { ReactComponent };
  export default src;
}
