import * as React from 'react';
import { createElement, forwardRef, HTMLAttributes } from 'react';
import clsx, { ClassValue } from 'clsx';

export function getDisplayName<TProps>(
  WrappedComponent: React.ComponentType<TProps>
) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export function createComponentWithPresetProps<TProps, TPresetProps extends {}>(
  Tag: React.ComponentType<TProps> | string,
  presetProps: TPresetProps,
  options: { displayName?: string } = {}
): React.FC<TProps> {
  const ComponentWithProps = (props: TProps) => (
    <Tag {...presetProps} {...props} />
  );

  ComponentWithProps.displayName =
    options?.displayName ||
    (typeof Tag === 'string'
      ? `${Tag.slice(0, 1).toUpperCase()}${Tag.slice(1)}`
      : getDisplayName(Tag));

  return ComponentWithProps;
}

export function createStyledHTMLComponent<
  T = HTMLElement,
  P extends HTMLAttributes<any> = HTMLAttributes<T>
>(
  type: string,
  classValueOrGetClassValue: ClassValue | ((props: P) => ClassValue)
) {
  const StyledHTMLComponent = forwardRef<T, P>((props, ref) => {
    const { className, ...restProps } = props as P & {
      className?: ClassValue;
    };
    return createElement(type, {
      ...restProps,
      ref,
      className: clsx(
        typeof classValueOrGetClassValue === 'function'
          ? classValueOrGetClassValue(props)
          : classValueOrGetClassValue,
        className
      ),
    });
  });

  StyledHTMLComponent.displayName = type;

  return StyledHTMLComponent;
}
