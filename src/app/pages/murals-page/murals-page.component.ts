import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { map, Observable } from 'rxjs';
import { Mural } from 'src/app/models/mural';
import { mapPoint, PointOfInterest } from 'src/app/models/point-of-interest';
import { ChipCardComponent } from 'src/app/shared/components/chip-card/chip-card.component';
import { FocusHoverService } from 'src/app/services/focus-hover.service';

@Component({
  selector: 'murals-page',
  templateUrl: './murals-page.component.html',
  styleUrls: ['./murals-page.component.scss']
})
export class MuralsPageComponent implements OnInit {
  @ViewChildren(ChipCardComponent, { read: ElementRef }) cardRefs!: QueryList<ElementRef>;

  constructor(
    private scully: ScullyRoutesService,
    private focusHoverService: FocusHoverService
  ) { }

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

  ngOnInit(): void {
  }

  currentTarget(isCurrentTarget: boolean, id: string) {
    if (isCurrentTarget) {
      return this.focusHoverService.updateIdentifer(id);
    }

    return this.focusHoverService.updateIdentifer('');
  }}
