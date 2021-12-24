import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'primary-card',
  templateUrl: './primary-card.component.html',
  styleUrls: ['./primary-card.component.scss']
})
export class PrimaryCardComponent implements OnInit {

  constructor() { }

  image: any = {

  }
  title: string ='cardcardcard'
  path: string = "example.com"
  ngOnInit(): void {
  }

}
