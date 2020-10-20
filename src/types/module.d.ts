declare module '*.svg' {
  const src: string;
  const ReactComponent: import('./index').SVGRComponent;
  export { ReactComponent };
  export default src;
}
