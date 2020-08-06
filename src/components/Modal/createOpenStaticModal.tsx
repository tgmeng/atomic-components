import * as React from 'react';

import openStaticElement from '../../utils/openStaticElement';
import { ModalProps, OpenStaticModalFn } from './types';

export default function createOpenStaticModal<P extends ModalProps>(
  Component: React.ComponentType<P>
): OpenStaticModalFn<P> {
  return function openStaticModal(initialState) {
    return openStaticElement((props) => <Component {...props} />, initialState);
  };
}
