import * as React from 'react';

import { Overlay as StyledOverlay } from './style';

const Overlay = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <StyledOverlay {...props} />
);

export default Overlay;
