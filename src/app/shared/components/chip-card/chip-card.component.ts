import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'chip-card',
  templateUrl: './chip-card.component.html',
  styleUrls: ['./chip-card.component.scss']
})
export class ChipCardComponent implements OnInit {

  constructor() { }

  image: any = {

  }
  
  @Input() title: string 
  @Input() path: string 
  ngOnInit(): void {
  }

}
