import * as React from 'react';

import LayoutContext from './Context';
import Aside from './Aside';

import { Layout as StyledLayout, Header, Content, Footer } from './style';
import { LayoutContextProps } from './type';

export type LayoutInterface = typeof StyledLayout & {
  Header: typeof Header;
  Aside: typeof Aside;
  Content: typeof Content;
  Footer: typeof Footer;
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
      <StyledLayout {...props} hasAside={hasAside} />
    </LayoutContext.Provider>
  );
}) as LayoutInterface;

Layout.Header = Header;
Layout.Aside = Aside;
Layout.Content = Content;
Layout.Footer = Footer;

export default Layout;
