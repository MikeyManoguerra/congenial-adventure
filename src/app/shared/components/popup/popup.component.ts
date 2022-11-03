import { Component, Input, OnInit } from '@angular/core';
import { DeserializedPoint } from '../../../services/map.service';

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
 @Input() point: DeserializedPoint;
  constructor() { }

  ngOnInit(): void {
  }

}
