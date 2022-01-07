import { Component, OnInit } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { map, Observable, tap } from 'rxjs';
import { Mural } from 'src/app/models/mural';

@Component({
  selector: 'murals-page',
  templateUrl: './murals-page.component.html',
  styleUrls: ['./murals-page.component.scss']
})
export class MuralsPageComponent implements OnInit {

  constructor(private scully: ScullyRoutesService) { }


  murals$: Observable<Mural[]> = this.scully.available$.pipe(
    map(routes => routes.filter(route => route.route.startsWith('/murals/') && route.sourceFile?.endsWith('.md')) as Mural[])
  );

  ngOnInit(): void {
    this.murals$.pipe(tap(x=>{console.log(x)}
    )).subscribe()
  }

}
