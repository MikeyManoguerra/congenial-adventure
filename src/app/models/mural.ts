import { ScullyRoute } from "@scullyio/ng-lib";
import { BaseContent } from "./BaseContent";

export interface Mural extends BaseContent, ScullyRoute {
  location: string;
  title: string;
  src: string;
  alt: string;
  attribution: string
  publish: boolean
  date: Date
  id:string
}
