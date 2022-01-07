import { Component, AfterViewInit, Input } from '@angular/core';
import * as L from 'leaflet';
import { Observable } from 'rxjs';
import { PointOfInterest } from 'src/app/models/point-of-interest';

@Component({
  selector: 'the-map',
  templateUrl: './the-map.component.html',
  styleUrls: ['./the-map.component.scss']
})
export class TheMapComponent implements AfterViewInit {
  private map: L.Map;

  @Input() mapPoints: PointOfInterest[] | null; //todo
  constructor() { }
  // https://www.digitalocean.com/community/tutorials/angular-angular-and-leaflet

  ngAfterViewInit(): void {
    this.initMap();
  }
  private initMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3
    });


    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });



    tiles.addTo(this.map);

    const points = this.serializeMapPoints();
    if (!points) return

    points.forEach(point => {

      L.geoJSON(point.location).addTo(this.map)
        .bindPopup(`${point.title}`)
        .openPopup()
    })
  }

  private serializeMapPoints() {
    return this.mapPoints?.map(point => {
      return {
        ...point,
        location: JSON.parse(point.location) 
      };

    })
  }
}