import { Component, OnInit } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { combineLatest, map, Observable, share, tap } from 'rxjs';
import { Mural } from 'src/app/models/mural';
import { mapPoint, PointOfInterest } from 'src/app/models/point-of-interest';

@Component({
  selector: 'murals-page',
  templateUrl: './murals-page.component.html',
  styleUrls: ['./murals-page.component.css']
})
export class MuralsPageComponent implements OnInit {

  constructor(private scully: ScullyRoutesService) { }

  murals$: Observable<Mural[]> = this.scully.available$.pipe(
    map(routes =>
      routes.filter(
        route => route.route.startsWith('/murals/') && route.sourceFile?.endsWith('.md')
      ) as Mural[]
    )
  );

  mapPoints$: Observable<PointOfInterest[]> = this.murals$.pipe(
    map(murals => murals.map(mural => mapPoint({ ...mural, isPrimary: true }))
    ),
  );

  ngOnInit(): void { }

}
