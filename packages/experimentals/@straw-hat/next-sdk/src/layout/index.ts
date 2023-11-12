import { NextPage } from 'next';
import type { ReactNode } from 'react';

export type PageLayout = (page: ReactNode) => ReactNode;

export type NextPageWithLayout = NextPage & {
  getPageLayout?: PageLayout;
};

export function getNoopLayout(page: ReactNode) {
  return page;
}
