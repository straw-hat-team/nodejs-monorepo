import * as React from 'react';
import { useRouter } from 'next/router';
import { NextTransitionOptions, NextUrl } from '../types';

/**
 * Redirects to a particular route when rendering the component.
 * @param props
 * @category ReactComponent
 */
function RedirectTo(props: {
  /**
   * url the route
   */
  url?: NextUrl;
  /**
   * masks `url` for the browser
   */
  as?: NextUrl;
  /**
   * object you can define `shallow` and other options
   */
  options?: NextTransitionOptions;
  /**
   * Performs a `replaceState` with arguments
   */
  replace?: boolean;
}) {
  const router = useRouter();

  React.useEffect(() => {
    if (!props.url) {
      return;
    }

    if (props.replace) {
      router.replace(props.url, props.as, props.options);
    } else {
      router.push(props.url, props.as, props.options);
    }
  }, [props.url, props.as, props.replace, props.options, router]);

  return null;
}

export { RedirectTo };
