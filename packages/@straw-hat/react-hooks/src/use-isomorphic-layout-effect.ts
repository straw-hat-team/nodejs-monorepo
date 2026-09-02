import { isSSR } from '@straw-hat/is-ssr';
import * as React from 'react';

export const useIsomorphicLayoutEffect = isSSR() ? React.useEffect : React.useLayoutEffect;
