import { ScullyRoute } from "@scullyio/ng-lib";
import { BaseContent } from "./BaseContent";
import { Species } from "./species";

export interface Mural extends BaseContent, ScullyRoute {
  location: string;
  title: string;
  src: string;
  alt: string;
  attribution: string
  publish: boolean
  date: Date
  id: string
  nearbyTrees?: NearbyTree[]
}


export interface NearbyTree {
  location: string;
  species: string; // id
  src?: string;
  alt?: string;
}


// TODO update with https://github.com/MikeyManoguerra/congenial-adventure/issues/9
export type NearbySpecies = Omit<NearbyTree, 'species'> & {
  species: Species
}
