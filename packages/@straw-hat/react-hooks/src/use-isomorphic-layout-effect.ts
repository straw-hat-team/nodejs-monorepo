import { isSSR } from '@straw-hat/is-ssr/dist';
import * as React from 'react';

export const useIsomorphicLayoutEffect = isSSR() ? React.useEffect : React.useLayoutEffect;
