import { Component, Input, OnInit } from '@angular/core';
import { PointOfInterest } from 'src/app/models/point-of-interest';


@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
 @Input() point: PointOfInterest;
  constructor() { }

  ngOnInit(): void {
  }

}
