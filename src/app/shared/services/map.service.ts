
import {  ComponentFactoryResolver, ComponentRef, Injectable, Injector } from '@angular/core';
import * as L from 'leaflet';
import { BehaviorSubject } from 'rxjs';
import { PointOfInterest } from 'src/app/models/point-of-interest';
import { PopupComponent } from '../components/popup/popup.component';

// // https://stackoverflow.com/questions/41285211/overriding-interface-property-type-defined-in-typescript-d-ts-file
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
    private resolver: ComponentFactoryResolver,
    private injector: Injector
  ) { }

  private readonly _currentTargetIdSource = new BehaviorSubject<string>('');
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

  getCurrentTargetId() {
    return this._currentTargetIdSource.getValue();
  }

  _setCurrentTargetId(id: string) {
    this._currentTargetIdSource.next(id);
  }

  updateCurrentTargetId(id: string) {
    const prevId = this.getCurrentTargetId();
    if (prevId) {
      this._updateIconClass(prevId, '')
    }

    this._setCurrentTargetId(id);
    const currentId = this.getCurrentTargetId();

    if (currentId) {
      this._updateIconClass(currentId, 'map-icon--featured')
    }
  }

  getPoints(): MappedPoint[] {
    return this._pointSource.getValue();
  }

  private _setPoints(points: MappedPoint[]): void {
    this._pointSource.next(points);
  }

  addPoint(map: L.Map, point: PointOfInterest) {
    const pointGroup = this._geoJSON(point.location).map(location => ({
      ...point,
      location
    }));

    const mappedPoints: MappedPoint[] = pointGroup.map(point => {
      const layer = this._initializedLeafletPoint(point).addTo(map);
      // warning: side effect!
      // this._addLayerToGroup(layer);

      return { point, layer };
    })

    this._setPoints([...this.getPoints(), ...mappedPoints]);
  }

  private _updateIconClass(id: string, klass: string) {
    const points = this.getPoints().filter(point => point.point.id === id);

    points.map(point => point.layer.setIcon(this._divIcon(point.point.isPrimary, klass)))

    this._setPoints([...points, ...this.getPoints().filter(point => id !== point.point.id)])
  }

  private _initializedLeafletPoint(point: DeserializedPoint) {
    const icon = this._divIcon(point.isPrimary, '');
    const [lon, lat] = point.location.coordinates;

    return L.marker([lat, lon], { icon }).bindPopup(this.muralPopup(point).location.nativeElement);
  }

  private _divIcon(isPrimary: boolean, targetClass: string) {
    const className = targetClass + ' ' + (isPrimary ? 'map-icon map-icon--primary' : 'map-icon');

    return L.divIcon({ className });

  }

  // Dont care about the order of the line points at this time,
  // and multipoint is not an available option by the underlying api,
  // so creating our own points no matter the original type
  private _geoJSON(geoJSON: string): GeoJSON.Point[] {
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

    return coordinates.map((point: number[]) => {
      return {
        type,
        coordinates: point
      }
    });
  }

  private muralPopup(point: DeserializedPoint): ComponentRef<PopupComponent> {
    // https://stackoverflow.com/a/64008789/14888291
    const component = this.resolver.resolveComponentFactory(PopupComponent).create(this.injector);
    component.instance.point = point;
    component.changeDetectorRef.detectChanges();

    return component;
  }

  primaryCoordinates(pointsOfInterest: DeserializedPoint[] = []): number[] {
    return pointsOfInterest.find(point => point.isPrimary)?.location?.coordinates || [-75.135626, 39.983705];
  }
}
