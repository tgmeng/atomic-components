import { Radio as InternalRadio } from './Radio';
import { RadioButton as InternalRadioButton } from './RadioButton';
import { RadioGroup } from './RadioGroup';
import { RadioProps, RadioButtonProps } from './types';

export interface RadioInterface
  extends React.ForwardRefExoticComponent<
    RadioProps & React.RefAttributes<HTMLInputElement>
  > {
  Group: typeof RadioGroup;
}

const Radio = InternalRadio as RadioInterface;
Radio.Group = RadioGroup;

export interface RadioButtonInterface
  extends React.ForwardRefExoticComponent<
    RadioButtonProps & React.RefAttributes<HTMLInputElement>
  > {
  Group: typeof RadioGroup;
}

const RadioButton = InternalRadioButton as RadioButtonInterface;
RadioButton.Group = RadioGroup;

export { Radio, RadioButton };
