export interface LayoutContextProps {
  asideHook: {
    add: (id: string) => void;
    remove: (id: string) => void;
  };
}

export interface AsideProps {
  width?: string | number;
  collapsedWidth?: string | number;
  collapsed?: boolean;
  onCollapse?: (value: boolean) => void;
}
