/**
 * 色值 from: https://ant.design/docs/spec/colors-cn
 */
import { blue, green, red, gold } from '@ant-design/colors';
import { hsl, transparentize } from 'polished';

export const BaseColor = {
  White: '#fff',
  Black: '#000',
};

export const TextColor = {
  Base: transparentize(0.35, BaseColor.Black)
}

export const Color = {
  Primary: blue[4],
  Info: blue[4],
  Success: green[4],
  Warning: gold[4],
  Danger: red[4],
  Disabled: transparentize(0.75, BaseColor.Black),
};

export const BackgroundColor = {
  Base: hsl(0, 0, 0.96),
};

export const BorderColor = {
  Base: hsl(0, 0, 0.85),
};
