import * as React from 'react';
import { FC, useMemo, useState } from 'react';

import { createStyledHTMLComponent } from '../../utils/component';

import { LayoutContext } from './LayoutContext';
import { Aside } from './Aside';

import {
  getLayoutStyle,
  headerStyle,
  contentStyle,
  footerStyle,
} from './style';
import { LayoutContextProps } from './type';

export type LayoutInterface = FC & {
  Header: FC;
  Aside: typeof Aside;
  Content: FC;
  Footer: FC;
};

const Layout = ((props) => {
  const [asides, setAsides] = useState<string[]>([]);

  const contextValue = useMemo<LayoutContextProps>(
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
        className={getLayoutStyle({
          hasAside,
        })}
      />
    </LayoutContext.Provider>
  );
}) as LayoutInterface;

Layout.Header = createStyledHTMLComponent<HTMLElement>('header', headerStyle);

Layout.Aside = Aside;

Layout.Content = createStyledHTMLComponent<HTMLElement>('main', contentStyle);

Layout.Footer = createStyledHTMLComponent<HTMLElement>('footer', footerStyle);

export { Layout };
