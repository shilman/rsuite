import React from 'react';
import type { StoryObj } from '@storybook/react-vite';
import ButtonToolbar from '../ButtonToolbar';
import Button from '../..//Button';
import { createMeta } from '@/storybook/utils';
import '../styles/index.less';

const meta = createMeta(ButtonToolbar);

export default {
  ...meta,
  title: 'Components/ButtonToolbar',
  component: ButtonToolbar,
};

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  children: [
    <Button key="1">Left</Button>,
    <Button key="2">Middle</Button>,
    <Button key="3">Right</Button>
  ]
};

export const Default: Story = {
  args: {
    ...defaultArgs
  }
};
