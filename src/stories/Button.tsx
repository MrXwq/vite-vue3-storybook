import {
  defineComponent,
  type CSSProperties,
  type ExtractPropTypes,
} from 'vue';

// Utils
import {
  extend,
  preventDefault,
  makeStringProp,
  createNamespace,
  BORDER_SURROUND,
} from './utils';


// Types
import type{
  ButtonSize,
  ButtonType,
} from './types';

const [name, bem] = createNamespace('button');

export const buttonProps = extend({}, {
  tag: makeStringProp<keyof HTMLElementTagNameMap>('button'),
  text: String,
  type: makeStringProp<ButtonType>('default'),
  size: makeStringProp<ButtonSize>('normal'),
  color: String,
  block: Boolean,
  plain: Boolean,
  round: Boolean,
  square: Boolean,
  loading: Boolean,
  hairline: Boolean,
  disabled: Boolean,
  iconPrefix: String,
});

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;

export default defineComponent({
  name,

  props: buttonProps,

  emits: ['click'],

  setup(props, { emit, slots }) {

    const renderText = () => {
      const text = slots.default ? slots.default() : props.text;

      if (text) {
        return <span class={bem('text')}>{text}</span>;
      }
    };

    const getStyle = () => {
      const { color, plain } = props;
      if (color) {
        const style: CSSProperties = {
          color: plain ? color : 'white',
        };

        if (!plain) {
          // Use background instead of backgroundColor to make linear-gradient work
          style.background = color;
        }

        // hide border when color is linear-gradient
        if (color.includes('gradient')) {
          style.border = 0;
        } else {
          style.borderColor = color;
        }

        return style;
      }
    };

    const onClick = (event: MouseEvent) => {
      if (props.loading) {
        preventDefault(event);
      } else if (!props.disabled) {
        emit('click', event);
      }
    };

    return () => {
      const {
        tag,
        type,
        size,
        block,
        round,
        plain,
        square,
        loading,
        disabled,
        hairline,
      } = props;

      const classes = [
        bem([
          type,
          size,
          {
            plain,
            block,
            round,
            square,
            loading,
            disabled,
            hairline,
          },
        ]),
        { [BORDER_SURROUND]: hairline },
      ];

      return (
        <tag
          class={classes}
          style={getStyle()}
          disabled={disabled}
          onClick={onClick}
        >
          <div class={bem('content')}>
            {renderText()}
          </div>
        </tag>
      );
    };
  },
});
