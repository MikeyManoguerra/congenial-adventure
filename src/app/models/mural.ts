import { BaseContent } from "./base-content";

export interface Mural extends BaseContent {
  location: string;
  title: string;
  src: string;
  alt: string;
  attribution: string
  publish: boolean
  date: Date
  id: string
  nearbyTrees?: NearbyTree[]; // TODO ensure an array, and not undefined
}

export interface NearbyTree {
  location: string;
  speciesId: string; // id
  src?: string;
  alt?: string;
}

