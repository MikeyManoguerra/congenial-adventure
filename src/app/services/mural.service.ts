import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, Observable, pluck, share } from 'rxjs';
import { Mural } from '../models/mural';
import { NearbySpecies, Species } from '../models/species';
import { AppScullyService } from './app-scully.service';

@Injectable({
  providedIn: 'root'
})
export class MuralService {

  constructor(private scully: AppScullyService) { }

  // this should maybe just take a slug?
  mural(activatedRoute: ActivatedRoute) {
    const routeSlug$ = activatedRoute.params.pipe(map(({ slug }) => slug));

    return combineLatest([routeSlug$, this.scully.publishedRoutes$]).pipe(
      map(([slug, routes]) => {
        return routes.find(route => route.route === `/murals/${slug}`) as Mural;
      }),
      share(),
    );
  }

  allMurals() {
    return this.scully.publishedRoutes$.pipe(
      map(routes =>
        routes.filter(
          route => route.route.startsWith('/murals/') && route.sourceFile?.endsWith('.md')
        ) as Mural[]
      )
    );
  }
}
