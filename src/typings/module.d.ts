type SVGRComponent = React.FC<React.SVGAttributes<SVGElement>>;

declare module '*.svg' {
  const defaultValue: string;
  const ReactComponent: SVGRComponent;
  export { ReactComponent };
  export default defaultValue;
}
