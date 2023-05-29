import react from '@vitejs/plugin-react';
import { defineProject, mergeConfig } from 'vitest/config';
import vitestRootConfig from '../../vitest.config';

export default mergeConfig(
	vitestRootConfig,
	defineProject({
		plugins: [react()],
		test: {
			environment: 'jsdom',
		},
	})
);
