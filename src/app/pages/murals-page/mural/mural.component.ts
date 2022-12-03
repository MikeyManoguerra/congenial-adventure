import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { combineLatest, map, Observable, pluck, tap } from 'rxjs';
import { BaseContent } from 'src/app/models/BaseContent';
import { Mural, NearbySpecies } from 'src/app/models/mural';
import { mapPoint, PointOfInterest } from 'src/app/models/point-of-interest';
import { Species } from 'src/app/models/species';
import { FocusHoverService } from 'src/app/services/focus-hover.service';

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

  nearbyTrees$: Observable<NearbySpecies[]> = combineLatest([
    this.mural,
    this.publishedRoutes
  ]).pipe(
    map(([mural, routes]) => {
      if (!mural.nearbyTrees) {
        return []
      }
      return mural.nearbyTrees.map(nearbyTree => ({
        ...nearbyTree,
        species: routes.find(route => route.id === nearbyTree.species) as Species
      }))
    }),
  )

  mapPoints$: Observable<PointOfInterest[]> = combineLatest([this.mural, this.nearbyTrees$]).pipe(
    map(([mural, trees]) =>
      [...trees, { ...mural, isPrimary: true }].map((point: NearbySpecies | Mural) => mapPoint(point as any)) // TODO bad any
    ),
  );

  ngOnInit(): void {
    this.publishedRoutes.pipe(tap(x => { debugger })).subscribe()
  }

  currentTarget(isCurrentTarget: boolean, id: string) {
    if (isCurrentTarget) {
      return this.focusHoverService.updateIdentifer(id);
    }

    return this.focusHoverService.updateIdentifer('')
  }
}
