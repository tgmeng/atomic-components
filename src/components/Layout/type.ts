export interface LayoutContextProps {
  asideHook: {
    add: (id: string) => void;
    remove: (id: string) => void;
  };
}
