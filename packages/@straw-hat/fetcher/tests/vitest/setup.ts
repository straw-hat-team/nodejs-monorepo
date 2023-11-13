import { vi } from 'vitest';

export const fetchMock = (globalThis.fetch = vi.fn<[input: RequestInfo | URL, init?: RequestInit]>());
