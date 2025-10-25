import type { StoryObj } from '@storybook/react-vite';
import Radio from '../Radio';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';

const meta = createMeta(Radio);

export default {
  ...meta,
  title: 'Components/Radio',
  component: Radio,
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};

export const WithChildren: Story = {
  args: {
    ...defaultArgs,
    children: 'Radio'
  }
};

export const Disabled: Story = {
  args: {
    ...defaultArgs,
    children: 'Radio',
    disabled: true
  }
};

export const ReadOnly: Story = {
  args: {
    ...defaultArgs,
    children: 'Radio',
    readOnly: true
  }
};
