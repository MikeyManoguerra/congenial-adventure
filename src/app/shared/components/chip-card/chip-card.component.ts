import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chip-card',
  templateUrl: './chip-card.component.html',
  styleUrls: ['./chip-card.component.scss']
})
export class ChipCardComponent implements OnInit {

  constructor() { }

  image: any = {

  }
  title: string ='cardcardcard'
  path: string = "example.com"

  ngOnInit(): void {
  }

}
