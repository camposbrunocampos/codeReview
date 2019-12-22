declare module "*.svg" {
  import { IconType } from "./src/icons/types";

  const content: IconType;

  export default content;
}

declare module "*.json" {
  const content: any;

  export default content;
}
