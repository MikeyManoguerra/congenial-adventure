import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'the-layout',
  template: '<ng-content></ng-content>',
  styleUrls: ['./the-layout.component.scss'],
})
export class TheLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
