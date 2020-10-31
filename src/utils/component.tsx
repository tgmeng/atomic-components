import * as React from 'react';

export function getDisplayName<T>(WrappedComponent: React.ComponentType<T>) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export function withProps<P, OP extends {}>(
  Tag: React.ComponentType<P> | string,
  outProps: OP,
  options: { displayName?: string } = {}
): React.FC<P> {
  const ComponentWithProps = (props: P) => <Tag {...outProps} {...props} />;

  ComponentWithProps.displayName =
    options?.displayName ||
    `withProps(${
      typeof Tag === 'string'
        ? `${Tag[0].toUpperCase()}${Tag.slice(1)}`
        : getDisplayName(Tag)
    })`;

  return ComponentWithProps;
}
