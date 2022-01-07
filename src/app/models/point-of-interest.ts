import { Mural } from "./mural";
import { Tree } from "./tree";

export interface PointOfInterest {
  route: string;
  location: string;
  title: string;
  id: string;
  src: string;
  alt: string;
  mural?: string;
  isPrimary: boolean;
}

export function mapPoint(baseContent: Mural | Tree): PointOfInterest {
  const {
    route,
    location,
    title,
    id,
    src,
    alt,
    mural,
    isPrimary
  } = baseContent
  
  const mapPoint = {
    route,
    location,
    title,
    id,
    src,
    alt,
    isPrimary: isPrimary ?? false
  }

  if(mural) return {...mapPoint, mural };

  return mapPoint;
}
