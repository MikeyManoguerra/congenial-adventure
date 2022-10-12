import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { combineLatest, map, Observable, pluck } from 'rxjs';
import { BaseContent } from 'src/app/models/BaseContent';
import { Mural } from 'src/app/models/mural';
import { mapPoint, PointOfInterest } from 'src/app/models/point-of-interest';
import { Tree } from 'src/app/models/tree';
import { FocusHoverService } from 'src/app/shared/services/focus-hover.service';

@Component({
  selector: 'mural',
  templateUrl: './mural.component.html',
  styleUrls: ['./mural.component.scss']
})
export class MuralComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private scully: ScullyRoutesService,
    private focusHoverService: FocusHoverService
  ) { }

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
      [...trees, { ...mural, isPrimary: true }].map((point: Tree | Mural) => mapPoint(point))
    ),
  );

  ngOnInit(): void { }

  currentTarget(isCurrentTarget: boolean, id: string) {
    if (isCurrentTarget) {
      return this.focusHoverService.updateIdentifer(id);
    }

    return this.focusHoverService.updateIdentifer('')
  }
}
