import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, Observable } from 'rxjs';
import { Mural, NearbyTree } from '../models/mural';
import { NearbySpecies, Species } from '../models/species';
import { AppScullyService } from './app-scully.service';
import { MuralService } from './mural.service';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {

  constructor(
    private scully: AppScullyService,
    private muralService: MuralService,
  ) { }

  public allSpecies() {
    return this.scully.publishedRoutes$.pipe(
      map(routes => {
        return routes.filter(route => route.route.startsWith('/species/') && route.sourceFile?.endsWith('.md')) as Species[];
      })
    );
  }

  // should take slug?
  public species(activatedRoute: ActivatedRoute) {
    const routeSlug$ = activatedRoute.params.pipe(map(({ slug }) => slug));

    return combineLatest([
      routeSlug$,
      this.scully.publishedRoutes$
    ]).pipe(
      map(([slug, routes]) => routes.find(route => route.route === `/species/${slug}`) as Species),
    );
  }


  nearbySpecies(mural$: Observable<Mural>): Observable<NearbySpecies[]> {
    return combineLatest([mural$, this.scully.publishedRoutes$]).pipe(
      map(([mural, routes]) => {
        if (!mural.nearbyTrees) {
          // nearbyTrees undefined if no trees associated
          return [];
        }


        return mural.nearbyTrees.map(nearbyTree => {
          const species = routes.find(route => route.id === nearbyTree.speciesId) as Species;

          // see NearbySpecies interface for note on why id and route are here
          return {
            ...nearbyTree,
            id: species.id,
            route: species.route,
            species: species
          }
        });
      }),
    )
  }

  // should take slug
  // todo memoize
  speciesExamples(activatedRoute: ActivatedRoute) {
    const species$ = this.species(activatedRoute);

    return combineLatest([this.muralService.allMurals(), species$]).pipe(
      map(([murals, currentSpecies]) => {
        // TODO workaround as
        const allTrees = murals.filter(({ nearbyTrees }) => !!nearbyTrees).flatMap(({ nearbyTrees }) => nearbyTrees) as NearbyTree[];

        return allTrees.filter(({ speciesId }) => speciesId === currentSpecies.id);
      })
    )
  }
}
