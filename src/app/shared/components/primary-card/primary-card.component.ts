import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'primary-card',
  templateUrl: './primary-card.component.html',
  styleUrls: ['./primary-card.component.scss']
})
export class PrimaryCardComponent implements OnInit {

  constructor() { }

  // todo refactor takes a "cardble" object

  @Input() image: { src: string, alt: string }
  @Input() title: string
  @Input() path: string
  ngOnInit(): void {
  }

}
