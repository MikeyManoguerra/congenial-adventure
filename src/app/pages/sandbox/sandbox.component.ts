import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, interval, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css']
})
export class SandboxComponent implements OnInit {

  constructor() { }

  x = new BehaviorSubject({ cools: [{ colds: '' }] })
  y = of({ cools: [{ colds: '' }] })

  w=of({yea:''})
  ngOnInit(): void {
    interval(1000).pipe(
      switchMap(() => { return this.w }),
      tap(x => {console.log(x);})
    ).subscribe()
  }



}