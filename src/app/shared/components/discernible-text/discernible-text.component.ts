import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'accessible-label',
  template: '<span>{{labelText}}</span>',
  styles: [
    `span {
      position: absolute;
      clip: rect(1px, 1px, 1px, 1px);
      clip-path: inset(50%);
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
    } `
  ]
})
export class DiscernibleTextComponent implements OnInit {
  // https://webaim.org/techniques/css/invisiblecontent/
  @Input() labelText: String;

  constructor() { }

  ngOnInit(): void {
  }

}
