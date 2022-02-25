import { Component, AfterViewInit, Input } from '@angular/core';
import * as L from 'leaflet';
import { Observable } from 'rxjs';
import { PointOfInterest } from 'src/app/models/point-of-interest';
import { MapService } from 'src/app/shared/services/map.service';


// const iconRetinaUrl = 'assets/marker-icon-2x.png';
// const iconUrl = 'assets/marker-icon.png';
// const shadowUrl = 'assets/marker-shadow.png';
// const iconDefault = L.icon({
//   iconRetinaUrl,
//   iconUrl,
//   shadowUrl,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   tooltipAnchor: [16, -28],
//   shadowSize: [41, 41]
// });
// L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'the-map',
  templateUrl: './the-map.component.html',
  styleUrls: ['./the-map.component.css']
})
export class TheMapComponent implements AfterViewInit {
  private map: L.Map;

  @Input() mapPoints: PointOfInterest[]; //todo
  @Input() intialZoom: number = 15;
  @Input() currentTargetId$: Observable<string>;

  constructor(private mapService: MapService) { }
  // https://www.digitalocean.com/community/tutorials/angular-angular-and-leaflet

  ngAfterViewInit(): void {
    this.initMap(this.mapService.primaryCoordinates());
    this.mapPoints.forEach(point => {
      this.mapService.addPoint(this.map, point)
    })

    this.currentTargetId$.subscribe(id => this.mapService.updateCurrentTargetId(id));
  }

  private initMap(initalPosition: number[]): void {
    const [lon, lat] = initalPosition;
    this.map = L.map('map', {
      scrollWheelZoom: false
    }).setView(
      [lat, lon],
      this.intialZoom);

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    // const x = L.circle([39.9, -75.135], { radius: 200 }).addTo(this.map);
    tiles.addTo(this.map);
  }
}
