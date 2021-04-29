import * as React from 'react';

import { asideStyle } from './styles';

import { useLayoutContext } from './LayoutContext';
import { AsideProps } from './types';

let id = 0;

export const Aside: React.FC<AsideProps> = ({
  width = 200,
  collapsedWidth = 80,
  collapsed = false,
  onCollapse,
  ...props
}) => {
  const layoutContext = useLayoutContext();

  React.useEffect(() => {
    id += 1;
    const strId = String(id);
    layoutContext.asideHook.add(strId);
    return () => layoutContext.asideHook.remove(strId);
  }, [layoutContext.asideHook]);

  const rawWidth = collapsed ? collapsedWidth : width;
  const finalWidth = typeof rawWidth === 'string' ? rawWidth : `${rawWidth}px`;

  return (
    <aside
      className={asideStyle}
      {...props}
      style={{
        width: finalWidth,
      }}
    />
  );
};
