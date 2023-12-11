import { render } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import * as React from 'react';
import { describe, expect, test, vi } from 'vitest';
import { RedirectTo } from '../../src/router/redirect-to';

export function createFakeRouterWrapper() {
  const router = {
    push: vi.fn(),
    replace: vi.fn(),
  };

  function Wrapper(props: React.PropsWithChildren<{}>) {
    //@ts-ignore Not needed to implement the entire thing, good enough for now.
    return <RouterContext.Provider value={router}>{props.children}</RouterContext.Provider>;
  }

  return { router, Wrapper };
}

describe('RedirectTo', () => {
  test('when rendering the component then redirects to the url using push', () => {
    const { router, Wrapper } = createFakeRouterWrapper();
    render(<RedirectTo url="/hello-world" />, { wrapper: Wrapper });
    expect(router.push).toBeCalledWith('/hello-world', undefined, undefined);
  });
  test('when rendering the component then redirects to the url', () => {
    const { router, Wrapper } = createFakeRouterWrapper();
    render(<RedirectTo url="/hello-world" replace />, { wrapper: Wrapper });
    expect(router.replace).toBeCalledWith('/hello-world', undefined, undefined);
  });
  test('when rendering the component then redirects to the url using shallow', () => {
    const options = { shallow: true };
    const { router, Wrapper } = createFakeRouterWrapper();
    render(<RedirectTo url="/hello-world" options={options} />, { wrapper: Wrapper });
    expect(router.push).toBeCalledWith('/hello-world', undefined, options);
  });

  test('when rendering the component without a url then it does not redirect to anywhere', () => {
    const { router, Wrapper } = createFakeRouterWrapper();
    render(<RedirectTo url={undefined} />, { wrapper: Wrapper });
    expect(router.push).not.toBeCalled();
    expect(router.replace).not.toBeCalled();
  });
});
