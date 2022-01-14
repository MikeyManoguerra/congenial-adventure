import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { PointOfInterest } from 'src/app/models/point-of-interest';

// Leaflet GeoJSON namespace.<>.type is just as string, not a GeoJsonTypes
// namespace GeoJSON  {
//   export interface LineString {
//     type: GeoJsonTypes,
//     coordinates: number[][]
//   }
//   export interface LineString {
//     type: GeoJsonTypes,
//     coordinates: number[][]
//   }
// }
// const POINT: string = 'Point' as GeoJsonTypes
// const LINE: string = 'LineString' as GeoJsonTypes

enum GeoJSONType {
  POINT = 'Point',
  LINE = 'LineString'
}

interface DeserializedPoint extends Omit<PointOfInterest, 'location'> {
  'location': GeoJSON.Point;
}

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { }

  primaryCoordinates(pointsOfInterest: DeserializedPoint[]): number[] {
    return pointsOfInterest.find(point => point.isPrimary)?.location?.coordinates || [39.983705, -75.135626];
  }

  addPointsToMap(map: L.Map, pointsOfInterest: DeserializedPoint[]) {
    if (!pointsOfInterest) return;
    // .sort((a: DeserializedPoint, b: DeserializedPoint) => Number(b.isPrimary) - Number(a.isPrimary))
    pointsOfInterest.forEach(point => {
      this.initializedLeafletPoint(point).addTo(map)
    })
  }

  private initializedLeafletPoint(point: DeserializedPoint) {
    const className = point.isPrimary ? 'map-icon map-icon--primary' : 'map-icon';
    const icon = L.divIcon({ className });
    const [lon, lat] = point.location.coordinates

    return L.marker([lat, lon], { icon }).bindPopup(this.muralPopup(point))
  }

  // ?
  // https://stackoverflow.com/questions/41285211/overriding-interface-property-type-defined-in-typescript-d-ts-file
  deserializedPoints(points: PointOfInterest[]): DeserializedPoint[] {
    return points.flatMap(point => {
      return this.geoJSON(point.location).map(location => ({
        ...point,
        location
      }));
    });
  }

  // Dont care about the order of the line points at this time,
  // and multipoint is not an available option by the underlying api,
  // so creating our own points no matter the original type
  private geoJSON(geoJSON: string): GeoJSON.Point[] {
    const { type, coordinates } = JSON.parse(geoJSON);

    if (![GeoJSONType.POINT, GeoJSONType.LINE].includes(type)) {
      throw new Error("Unsupported GeoJSON type");
    }

    if (type === GeoJSONType.POINT) {
      return [{
        type,
        coordinates,
      }];

    }

    return coordinates.map((point: number[]) => [{
      type,
      coordinates: point
    }])
  }

  private muralPopup(point: DeserializedPoint): string {
    // TODO use component factory
    return `` +
      `<div>Title: ${point.title}</div>` +
      `<a href="${point.route}">State: ${point.route}</div>`
  }
}
