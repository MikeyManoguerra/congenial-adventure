import { Observable } from "rxjs";
import { BaseContent } from "./base-content";
import { GeoJSONType } from "./geo-json-type";
import { Mural } from "./mural";


export interface PointOfInterest {
  route: string;
  location: GeoJSON.Point;
  title?: string; // used on popup
  id: string;
  src: string;
  alt: string;
  mural?: string;
  isPrimary: boolean;
}

export function mapPoint(baseContent: BaseContent): PointOfInterest {
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
    location: normalizedGeoJSONPoint(location),
    title,
    id,
    src,
    alt,
    isPrimary: isPrimary ?? false
  }

  if(mural) return {...mapPoint, mural };

  return mapPoint;
}



export function normalizedGeoJSONPoint(geoJSON: string): GeoJSON.Point {
  const { type, coordinates } = JSON.parse(geoJSON);

  if (GeoJSONType.POINT !== type) {
    throw new Error("Unsupported GeoJSON type");
  }

  return {
    type,
    coordinates,
  };
}

// export function mapPoints(...args: Observable<BaseContent|>[]) {

// }

