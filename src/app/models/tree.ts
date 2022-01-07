import { ScullyRoute } from "@scullyio/ng-lib";
import { BaseContent } from "./BaseContent";


export interface Tree extends BaseContent, ScullyRoute {
  location: string;
  id: string;
  src: string;
  alt: string;
  title: string;
  species: string;
  mural: string;
  publish: boolean
  date: Date;
}