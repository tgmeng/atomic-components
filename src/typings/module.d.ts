type SVGRComponent = React.StatelessComponent<React.SVGAttributes<SVGElement>>;

declare module '*.svg' {
  const rawValue: string;
  const value: SVGRComponent;
  export { value as ReactComponent };
  export default rawValue;
}
