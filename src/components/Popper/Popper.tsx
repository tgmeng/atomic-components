import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';

import useControlledState from '../../hooks/useControlledState';

import { PopperProps } from './type';
import { Content, Arrow } from './style';

export interface PopperInterface extends React.FC<PopperProps> {
  Content: typeof Content;
  Arrow: typeof Arrow;
}

const Popper: PopperInterface = ({
  isOpen: isOpenExternal,
  trigger = 'hover',
  content,
  contentClassName,
  arrowClassName,
  hasArrow = true,
  onOpenChange,
  enterDelay = 100,
  leaveDelay = 100,
  children,
  ...restProps
}) => {
  const [isOpen, setIsOpen] = useControlledState(
    isOpenExternal,
    onOpenChange,
    false
  );

  /**
   * trigger === hover, should delay
   */
  const timeoutRef = React.useRef<number>(0);
  const delayedToggle = React.useCallback(
    (value: boolean) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(
        () => {
          setIsOpen(value);
        },
        value ? enterDelay : leaveDelay
      );
    },
    [enterDelay, leaveDelay, setIsOpen]
  );
  const contentMouseEventProps = React.useMemo(
    () =>
      trigger === 'hover'
        ? {
            onMouseEnter: () => delayedToggle(true),
            onMouseLeave: () => delayedToggle(false),
          }
        : {},
    [trigger, delayedToggle]
  );

  /**
   * config popper
   */
  const [
    referenceElement,
    setReferenceElement,
  ] = React.useState<HTMLDivElement | null>(null);

  const [
    popperElement,
    setPopperElement,
  ] = React.useState<HTMLDivElement | null>(null);

  const [arrowElement, setArrowElement] = React.useState<HTMLDivElement | null>(
    null
  );

  const { styles, attributes, update } = usePopper(
    referenceElement,
    popperElement,
    {
      modifiers: [
        ...(hasArrow
          ? [
              {
                name: 'arrow',
                options: { element: arrowElement, padding: 8 },
              },
            ]
          : []),
        {
          name: 'offset',
          options: { offset: [0, hasArrow ? 8 : 0] },
        },
        { name: 'flip' },
        { name: 'preventOverflow' },
      ],
    }
  );

  const triggerProps = React.useMemo(() => {
    switch (trigger) {
      case 'click':
        return {
          onClick: () => setIsOpen((_isOpen) => !_isOpen),
        };
      case 'focus':
        return {
          onFocus: () => setIsOpen(true),
          onBlur: () => setIsOpen(false),
        };
      case 'hover':
      default:
        return {
          onMouseEnter: () => delayedToggle(true),
          onMouseLeave: () => delayedToggle(false),
        };
    }
  }, [delayedToggle, setIsOpen, trigger]);

  // eslint-disable-next-line consistent-return
  React.useEffect(() => {
    if (trigger === 'click') {
      // trigger === click, should close when click outside
      const handler = (event: MouseEvent) => {
        if (!popperElement?.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('click', handler);
      return () => {
        document.removeEventListener('click', handler);
      };
    }
  }, [trigger, popperElement?.contains, setIsOpen]);

  React.useLayoutEffect(() => {
    update?.();
  }, [update]);

  if (!children) {
    return null;
  }

  return (
    <>
      {React.cloneElement(children, {
        ...restProps,
        ...triggerProps,
        ref: setReferenceElement,
      })}
      {isOpen &&
        ReactDOM.createPortal(
          <Content
            {...attributes.popper}
            className={contentClassName}
            ref={setPopperElement}
            style={styles.popper}
            {...contentMouseEventProps}
          >
            {content}
            {hasArrow && (
              <Arrow
                ref={setArrowElement}
                className={arrowClassName}
                style={styles.arrow}
              />
            )}
          </Content>,
          document.body
        )}
    </>
  );
};

Popper.Content = Content;
Popper.Arrow = Arrow;

export default Popper;
