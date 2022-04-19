import { ScullyRoute } from "@scullyio/ng-lib";
import { BaseContent } from "./BaseContent";

export interface Species extends BaseContent, ScullyRoute {
  id: string
  date: Date
  publish: boolean
  name: string
  species: string
  genus: string
  family: string
  body: string
}


