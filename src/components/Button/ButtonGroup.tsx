import * as React from 'react';
import clsx from 'clsx';

import { ButtonGroupProps } from './type';
import { buttonGroupStyle, buttonGroupItemStyle } from './style';

export const ButtonGroup = ({ children, ...props }: ButtonGroupProps) => {
  return (
    <div className={buttonGroupStyle} {...props}>
      {Array.isArray(children)
        ? children.map((node) =>
            React.cloneElement(node, {
              ...node.props,
              className: clsx([node.props.className, buttonGroupItemStyle]),
            })
          )
        : React.cloneElement(children, {
            ...children.props,
            className: clsx([
              children.props.className,
              buttonGroupItemStyle,
            ]),
          })}
    </div>
  );
};
