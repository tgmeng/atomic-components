import * as React from 'react';

import { withProps } from '../../utils/component';

import LayoutContext from './Context';
import Aside from './Aside';

import {
  getLayoutStyle,
  headerStyle,
  contentStyle,
  footerStyle,
} from './style';
import { LayoutContextProps } from './type';

export type LayoutInterface = React.FC & {
  Header: React.FC;
  Aside: typeof Aside;
  Content: React.FC;
  Footer: React.FC;
};

const Layout = ((props) => {
  const [asides, setAsides] = React.useState<string[]>([]);

  const contextValue = React.useMemo<LayoutContextProps>(
    () => ({
      asideHook: {
        add: (id: string) => setAsides((ids) => [...ids, id]),
        remove: (id: string) =>
          setAsides((ids) => ids.filter((asideId) => asideId !== id)),
      },
    }),
    []
  );

  const hasAside = asides.length > 0;

  return (
    <LayoutContext.Provider value={contextValue}>
      <section
        {...props}
        css={getLayoutStyle({
          hasAside,
        })}
      />
    </LayoutContext.Provider>
  );
}) as LayoutInterface;

Layout.Header = withProps('header', {
  css: headerStyle,
});
Layout.Aside = Aside;
Layout.Content = withProps('main', {
  css: contentStyle,
});
Layout.Footer = withProps('footer', {
  css: footerStyle,
});

export default Layout;
