import type { Meta, StoryObj } from '@storybook/vue3'
import { action } from '@storybook/addon-actions'

import Button from './Button.jsx'
import { defaultProp } from './storiesCommon'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Example/Button',
  component: Button,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    type: defaultProp('Props', 'default', 'string', '类型样式', {
      options: ['default', 'primary', 'danger', 'warning', 'success', 'safe', 'minor'],
      control: {
        type: 'select'
      }
    }),
    text: defaultProp('Props', '-', 'string', '按钮文字'),
    size: defaultProp('Props', 'normal', 'string', '尺寸', {
      options: ['small', 'normal', 'large', 'mini'],
      control: { type: 'select' }
    }),
    color: defaultProp('Props', 'normal', 'string', '按钮颜色，支持传入 linear-gradient 渐变色', {
      control: { type: 'color' }
    }),
    tag: defaultProp('Props', 'button', 'string', '原生元素节点'),
    disabled: defaultProp('Props', 'false', 'boolean', '不可点击', {
      control: {
        type: 'boolean'
      }
    }),
    block: defaultProp('Props', 'false', 'boolean', '块级元素按钮', {
      control: {
        type: 'boolean'
      }
    }),
    round: defaultProp('Props', 'false', 'boolean', '圆角按钮', {
      control: {
        type: 'boolean'
      }
    }),
    square: defaultProp('Props', 'false', 'boolean', '方形按钮', {
      control: {
        type: 'boolean'
      }
    }),
    hairline: defaultProp('Props', 'false', 'boolean', '是否使用 0.5px 边框', {
      control: {
        type: 'boolean'
      }
    }),

    onClick: defaultProp(
      'Events',
      '-',
      '回调参数：event: MouseEvent',
      '点击按钮，且按钮状态不为禁用时触发',
      {
        name: 'click',
        control: { type: '-' }
      }
    ),

    default: {
      table: {
        category: 'Slots'
      },
      control: { type: 'text' },
      description: '按钮内容'
    },
  }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */

export const Primary: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: `
    <Button v-bind="args">
      <template v-if="args.default" #default>${args.default}</template>
    </Button>`,
  }),
  args: {
    text: 'Button',
    default: 'Content',
    onClick: action('click')
  },
};

export const Secondary: Story = {
  args: {
    text: 'Button'
  }
}

export const Large: Story = {
  args: {
    size: 'large'
  }
}

export const Small: Story = {
  args: {
    size: 'small'
  }
}
