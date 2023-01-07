import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, Observable, tap } from 'rxjs';
import { mapPoint, PointOfInterest } from 'src/app/models/point-of-interest';
import { FocusHoverService } from 'src/app/services/focus-hover.service';
import { MuralService } from 'src/app/services/mural.service';
import { SpeciesService } from 'src/app/services/species.service';

@Component({
  selector: 'mural',
  templateUrl: './mural.component.html',
  styleUrls: ['./mural.component.scss']
})
export class MuralComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private focusHoverService: FocusHoverService,
    private muralService: MuralService,
    private speciesService: SpeciesService
  ) { }

  protected mural$ = this.muralService.mural(this.activatedRoute);
  protected nearbyTrees$ = this.speciesService.nearbySpecies(this.mural$);

  mapPoints$: Observable<PointOfInterest[]> = combineLatest([this.mural$, this.nearbyTrees$]).pipe(
    map(([mural, trees]) =>
      [...trees, { ...mural, isPrimary: true }].map(point => mapPoint(point))
    ),
  );

  ngOnInit(): void {
  }

  currentTarget(isCurrentTarget: boolean, id: string) {
    if (isCurrentTarget) {
      return this.focusHoverService.updateIdentifer(id);
    }

    return this.focusHoverService.updateIdentifer('')
  }
}
