import type { ReactNode } from 'react';
import { NextPage } from 'next';

export type PageLayout = (page: ReactNode) => ReactNode;

export type NextPageWithLayout = NextPage & {
  getPageLayout?: PageLayout;
};

export function getNoopLayout(page: ReactNode) {
  return page;
}
