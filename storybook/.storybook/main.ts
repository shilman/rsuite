// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const Component = process.env.M;

const stories = Component
  ? [`../../src/**/${Component}.stories.@(js|jsx|mjs|ts|tsx)`]
  : ['../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'];

const config: StorybookConfig = {
  stories: ['../../src/**/*.mdx', ...stories],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-onboarding',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-mcp'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      resolve: {
        alias: [
          { find: '@/storybook/', replacement: path.resolve(__dirname, '../') + '/' },
          {
            find: '@/internals/',
            replacement: path.resolve(__dirname, '../../src/internals') + '/'
          }
        ]
      }
    });
  },
  features: {
    experimentalCodeExamples: true,
    experimentalComponentsManifest: true
  }
};
export default config;
