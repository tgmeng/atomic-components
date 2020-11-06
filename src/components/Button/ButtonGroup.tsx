import * as React from 'react';
import cx from 'classnames';

import { ButtonGroupProps } from './type';
import { buttonGroupStyle, buttonGroupItemRawStyle } from './style';

const ButtonGroup = ({ children, ...props }: ButtonGroupProps) => {
  return (
    <div css={buttonGroupStyle} {...props}>
      {Array.isArray(children)
        ? children.map((node) =>
            React.cloneElement(node, {
              ...node.props,
              className: cx([node.props.className, buttonGroupItemRawStyle]),
            })
          )
        : React.cloneElement(children, {
            ...children.props,
            className: cx([children.props.className, buttonGroupItemRawStyle]),
          })}
    </div>
  );
};

export default ButtonGroup;
