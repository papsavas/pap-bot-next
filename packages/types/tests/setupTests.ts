import { beforeAll, expect } from 'vitest';
beforeAll(() => expect(expect.getState().environment).toBe('node'));
