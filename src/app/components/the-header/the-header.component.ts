import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'the-header',
  templateUrl: './the-header.component.html',
  styleUrls: ['./the-header.component.scss']
})
export class TheHeaderComponent implements OnInit {
  name: string = 'Art and Arbor'
  constructor() { }

  ngOnInit(): void {
  }

}
