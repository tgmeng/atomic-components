import * as React from 'react';

import { Aside as StyledAside } from './style';

import { useLayoutContext } from './Context';

let id = 0;

const Aside = ((props) => {
  const layoutContext = useLayoutContext();

  React.useEffect(() => {
    id += 1;
    const strId = String(id);
    layoutContext.asideHook.add(strId);
    return () => layoutContext.asideHook.remove(strId);
  }, [layoutContext.asideHook]);

  return <StyledAside {...props} />;
}) as typeof StyledAside;

export default Aside;
