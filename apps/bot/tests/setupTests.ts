import dotenv from 'dotenv';
import findConfig from 'find-config';
import { beforeAll, expect } from 'vitest';
dotenv.config({ path: findConfig('.env')! });

beforeAll(() => expect(expect.getState().environment).toBe('node'));
