import { BaseContent } from "./base-content";
import { NearbyTree } from "./mural";

export interface Species extends BaseContent {
  id: string;
  date: Date;
  publish: boolean;
  name: string;
  species: string;
  genus: string;
  family: string;
  body: string;
  src: string;
  alt: string;
}

// were inheriting from BaseContent here.
// technically a nearby tree doesnt have an id or route as its just an array item  on Mural
// we can accept putting species id/route here because its a 1:1 relationship
// this makes it easier to pass nearbySpecies around as generic arg

// TODO update with https://github.com/MikeyManoguerra/congenial-adventure/issues/9
export interface NearbySpecies extends Omit<NearbyTree, 'species'>, BaseContent {
  species: Species
}
