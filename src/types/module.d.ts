import { SVGRComponent } from '.';

declare module '*.svg' {
  const src: string;
  const ReactComponent: SVGRComponent;
  export { ReactComponent };
  export default src;
}
