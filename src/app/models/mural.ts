import { ScullyRoute } from "@scullyio/ng-lib";

export interface Mural extends ScullyRoute {
  title: string
  id: string
  attribution: string
  publish: boolean
  src: string
  alt: string
  location: string
  date: Date
}