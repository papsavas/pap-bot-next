import '@testing-library/jest-dom';
import { beforeAll, expect } from 'vitest';

beforeAll(() => expect(expect.getState().environment).toBe('jsdom'));
