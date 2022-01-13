import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { PointOfInterest } from 'src/app/models/point-of-interest';

interface DeserializedPoint extends Omit<PointOfInterest, 'location'> {
  'location': GeoJSON.Point
}

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { }

  addPointsToMap(map: L.Map, points: PointOfInterest[]) {

    if (!points) return
    const deserializdPoints = this.deserializePoints(points);
    https://stackoverflow.com/questions/41285211/overriding-interface-property-type-defined-in-typescript-d-ts-file
    deserializdPoints.forEach(point => {
      const icon = L.divIcon({ className: 'map-icon' });
      const [lon, lat] = point.location.coordinates
      L.marker([lat, lon], { icon: icon })
        .bindPopup(this.muralPopup(point))
        .addTo(map)
    })


  }

  private deserializePoints(points: PointOfInterest[]) {
    return points.map(point => {
      return {
        ...point,
        location: JSON.parse(point.location) as GeoJSON.Point
      };
    })
  }


  private muralPopup(point: DeserializedPoint): string {
    // TODO use component factory
    return `` +
      `<div>Title: ${point.title}</div>` +
      `<a href="${point.route}">State: ${point.route}</div>`
  }
}
