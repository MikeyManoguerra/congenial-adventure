import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { combineLatest, map, Observable, pluck } from 'rxjs';
import { BaseContent } from 'src/app/models/BaseContent';
import { Species } from 'src/app/models/species';
import { FocusHoverService } from 'src/app/services/focus-hover.service';

@Component({
  selector: 'species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.scss']
})
export class SpeciesComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private scully: ScullyRoutesService,
    private focusHoverService: FocusHoverService
  ) { }

  publishedRoutes$: Observable<BaseContent[]> = this.scully.available$ as Observable<BaseContent[]>;

  public species$: Observable<Species> = combineLatest([
    this.activatedRoute.params.pipe(pluck('slug')),
    this.publishedRoutes$
  ]).pipe(
    map(([slug, routes]) =>
      routes.find(route => route.route === `/species/${slug}`) as Species
    ),
    );

    ngOnInit(): void {
  }

}
