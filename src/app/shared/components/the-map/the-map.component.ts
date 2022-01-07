import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'the-map',
  templateUrl: './the-map.component.html',
  styleUrls: ['./the-map.component.scss']
})
export class TheMapComponent implements AfterViewInit {
  private map: L.Map;

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
  }
}