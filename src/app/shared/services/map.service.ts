
import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { BehaviorSubject } from 'rxjs';
import { PointOfInterest } from 'src/app/models/point-of-interest';
import { normalizedGeoJSON } from '../lib';
import { MapPopupService } from './map-popup.service';

export interface DeserializedPoint extends Omit<PointOfInterest, 'location'> {
  'location': GeoJSON.Point;
}

interface MappedPoint {
  point: DeserializedPoint;
  layer: L.Marker
}

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(
    private mapPopupService: MapPopupService
  ) { }

  private readonly _pointSource = new BehaviorSubject<MappedPoint[]>([]);
  private readonly _layerGroupSource = new BehaviorSubject<L.LayerGroup>(L.layerGroup([]))

  // Exposed observable (read-only).
  // readonly points$ = this._pointSource.asObservable();

  getLayerGroup(): L.LayerGroup {
    return this._layerGroupSource.getValue();
  }

  private _setLayerGroup(layerGroup: L.LayerGroup) {
    this._layerGroupSource.next(layerGroup);
  }

  private _addLayerToGroup(layer: L.Layer) {
    this._setLayerGroup(this.getLayerGroup().addLayer(layer))
  }

  getPoints(): MappedPoint[] {
    return this._pointSource.getValue();
  }

  private _setPoints(points: MappedPoint[]): void {
    this._pointSource.next(points);
  }

  updateCurrentTargetId([prevId, currentId]: [string, string]) {
    if (prevId) {
      this._updateIconClass(prevId, '')
    }

    if (currentId) {
      this._updateIconClass(currentId, 'map-icon--featured')
    }
  }

  addEntityToMap(map: L.Map, point: PointOfInterest) {
    const pointOrLine = normalizedGeoJSON(point.location).map(location => ({
      ...point,
      location
    }));

    const mappedPoints: MappedPoint[] = pointOrLine.map(point => {
      const layer = this._initializedLeafletPoint(point).addTo(map);
      // warning: side effect!
      // this._addLayerToGroup(layer);

      return { point, layer };
    })

    this._setPoints([...this.getPoints(), ...mappedPoints]);
  }

  private _updateIconClass(id: string, klass: string) {
    const points = this.getPoints().filter(point => point.point.id === id);

    points.map(point => point.layer.setIcon(this._divIcon(point.point.isPrimary, klass)));

    this._setPoints([...points, ...this.getPoints().filter(point => id !== point.point.id)]);
  }

  private _initializedLeafletPoint(point: DeserializedPoint) {
    const icon = this._divIcon(point.isPrimary, '');
    const [lon, lat] = point.location.coordinates;

    return L.marker([lat, lon], { icon }).bindPopup(this.mapPopupService.popupElement(point));
  }

  private _divIcon(isPrimary: boolean, targetClass: string) {
    const className = targetClass + ' ' + (isPrimary ? 'map-icon map-icon--primary' : 'map-icon');

    return L.divIcon({
      iconSize:[20, 20],
      className
    });
  }

  primaryCoordinates(pointsOfInterest: DeserializedPoint[] = []): number[] {
    return pointsOfInterest.find(point => point.isPrimary)?.location?.coordinates || [-75.135626, 39.983705];
  }
}
