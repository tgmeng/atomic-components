import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';

import { PopperProps } from './type';
import { Content, Arrow } from './style';

const Popper: React.FC<PopperProps> = ({
  isOpen: isOpenExternal,
  trigger,
  content,
  contentClassName,
  arrowClassName,
  children,
  ...restProps
}) => {
  const [isOpenInternal, setIsOpen] = React.useState(false);
  const isOpen = trigger === 'manual' ? isOpenExternal : isOpenInternal;

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
      ...restProps,
      modifiers: [
        {
          name: 'arrow',
          options: { element: arrowElement, padding: 5 },
        },
        {
          name: 'offset',
          options: { offset: [10, 10] },
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
          onClick() {
            setIsOpen(!isOpen);
          },
        };
      case 'focus':
        return {
          onFocus() {
            setIsOpen(true);
          },
          onBlur() {
            setIsOpen(false);
          },
        };
      case 'manual':
        return {};
      case 'hover':
      default:
        return {
          onMouseEnter() {
            setIsOpen(true);
          },
          onMouseLeave() {
            setIsOpen(false);
          },
        };
    }
  }, [isOpen, trigger]);

  // eslint-disable-next-line consistent-return
  React.useEffect(() => {
    if (trigger === 'click') {
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
  }, [trigger, isOpen, popperElement?.contains]);

  React.useLayoutEffect(() => {
    update?.();
  }, [update]);

  if (!children || !content) {
    return null;
  }

  return (
    <>
      {React.cloneElement(children, {
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
          >
            {content}
            <Arrow
              ref={setArrowElement}
              className={arrowClassName}
              style={styles.arrow}
            />
          </Content>,
          document.body
        )}
    </>
  );
};

export default Popper;
