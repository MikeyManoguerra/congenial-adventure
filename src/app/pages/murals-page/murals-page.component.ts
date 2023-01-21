import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { map, Observable } from 'rxjs';
import { mapPoint, PointOfInterest } from 'src/app/models/point-of-interest';
import { ChipCardComponent } from 'src/app/shared/components/chip-card/chip-card.component';
import { FocusHoverService } from 'src/app/services/focus-hover.service';
import { MuralService } from 'src/app/services/mural.service';

@Component({
  selector: 'murals-page',
  templateUrl: './murals-page.component.html',
  styleUrls: ['./murals-page.component.scss']
})
export class MuralsPageComponent implements OnInit {
  @ViewChildren(ChipCardComponent, { read: ElementRef }) cardRefs!: QueryList<ElementRef>;

  constructor(
    private muralService: MuralService,
    private focusHoverService: FocusHoverService
  ) { }

  murals$ = this.muralService.allMurals();


  mapPoints$: Observable<PointOfInterest[]> = this.murals$.pipe(
    map(murals => murals.map(mural => mapPoint({ ...mural, isPrimary: true }))),
  );

  ngOnInit(): void {
  }

  currentTarget(isCurrentTarget: boolean, id: string) {
    if (isCurrentTarget) {
      return this.focusHoverService.updateIdentifer(id);
    }

    return this.focusHoverService.updateIdentifer('');
  }}
