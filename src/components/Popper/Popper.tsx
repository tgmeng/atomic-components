import * as React from 'react';
import {
  cloneElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';

import { createStyledHTMLComponent } from '../../utils/component';
import { useControlledState } from '../../hooks/useControlledState';

import { PopperProps } from './types';
import { contentStyle, arrowStyle } from './styles';

export const Content = createStyledHTMLComponent<HTMLDivElement>(
  'div',
  contentStyle
);

export const Arrow = createStyledHTMLComponent<HTMLDivElement>(
  'div',
  arrowStyle
);

export interface PopperInterface extends React.FC<PopperProps> {
  Content: typeof Content;
  Arrow: typeof Arrow;
}

const Popper: PopperInterface = ({
  isOpen: isOpenExternal,
  trigger = 'hover',
  placement,
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
  const timeoutRef = useRef<number>(0);
  const delayedToggle = useCallback(
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
  const contentMouseEventProps = useMemo(
    () =>
      trigger === 'hover'
        ? {
            onMouseEnter: () => {
              delayedToggle(true);
            },
            onMouseLeave: () => {
              delayedToggle(false);
            },
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
  ] = useState<HTMLDivElement | null>(null);

  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );

  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);

  const { styles, attributes, update } = usePopper(
    referenceElement,
    popperElement,
    {
      placement,
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

  const triggerProps = useMemo(() => {
    switch (trigger) {
      case 'click':
        return {
          onClick: () => {
            setIsOpen((isOpenNow) => !isOpenNow);
          },
        };
      case 'focus':
        return {
          onFocus: () => {
            setIsOpen(true);
          },
          onBlur: () => {
            setIsOpen(false);
          },
        };
      case 'hover':
      default:
        return {
          onMouseEnter: () => {
            delayedToggle(true);
          },
          onMouseLeave: () => {
            delayedToggle(false);
          },
        };
    }
  }, [delayedToggle, setIsOpen, trigger]);

  useEffect(() => {
    if (trigger === 'click') {
      // trigger === click, should close when click outside
      const handler = (event: MouseEvent) => {
        if (
          !popperElement?.contains(event.target as Node) &&
          !referenceElement?.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener('click', handler);
      return () => {
        document.removeEventListener('click', handler);
      };
    }
    return () => {};
  }, [trigger, popperElement, referenceElement, isOpen, setIsOpen]);

  useLayoutEffect(() => {
    update?.();
  }, [update]);

  if (!children) {
    return null;
  }

  return (
    <>
      {cloneElement(children, {
        ...restProps,
        ...triggerProps,
        ref: setReferenceElement,
      })}
      {isOpen &&
        createPortal(
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

export { Popper };
