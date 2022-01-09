import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';
import { combineLatest, map, Observable, pluck, share, tap } from 'rxjs';
import { BaseContent } from 'src/app/models/BaseContent';
import { Mural } from 'src/app/models/mural';
import { mapPoint, PointOfInterest } from 'src/app/models/point-of-interest';
import { Tree } from 'src/app/models/tree';
@Component({
  selector: 'mural',
  templateUrl: './mural.component.html',
  styleUrls: ['./mural.component.scss']
})
export class MuralComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private scully: ScullyRoutesService) { }

  publishedRoutes: Observable<BaseContent[]> = this.scully.available$ as Observable<BaseContent[]>;

  public mural: Observable<Mural> = combineLatest([
    this.activatedRoute.params.pipe(pluck('slug')),
    this.publishedRoutes
  ]).pipe(
    map(([slug, routes]) =>
      routes.find(route => route.route === `/murals/${slug}`) as Mural
    ),
  );

  muralId$: Observable<string> = this.mural.pipe(
    map(mural => mural.id),
  )

  trees$: Observable<Tree[]> = combineLatest([
    this.muralId$,
    this.publishedRoutes
  ]).pipe(
    map(([id, routes]) => routes.filter(route => route.mural === id) as Tree[]),
  )

  mapPoints$: Observable<PointOfInterest[]> = combineLatest([this.mural, this.trees$]).pipe(
    map(([mural, trees]) =>
      [{ ...mural, isPrimary: true }, ...trees].map((point: Tree | Mural) => mapPoint(point))
    ),
  );

  ngOnInit(): void {



    // this.trees$ =


    //   this.mapPoints$ =
    //   this.mapPoints$.subscribe()
  }

}
