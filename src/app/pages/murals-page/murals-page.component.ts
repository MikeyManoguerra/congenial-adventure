import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { combineLatest, fromEvent, map, merge, Observable, share, switchMap, take, tap } from 'rxjs';
import { Mural } from 'src/app/models/mural';
import { mapPoint, PointOfInterest } from 'src/app/models/point-of-interest';
import { ChipCardComponent } from 'src/app/shared/components/chip-card/chip-card.component';

@Component({
  selector: 'murals-page',
  templateUrl: './murals-page.component.html',
  styleUrls: ['./murals-page.component.css']
})
export class MuralsPageComponent implements OnInit {
  @ViewChildren(ChipCardComponent, { read: ElementRef }) cardRefs!: QueryList<ElementRef>;

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

  currentTargetId$: Observable<string>

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const muralCards = this.cardRefs.changes.pipe(
      take(1),
    ) as Observable<ElementRef[]>

    const mouseEnter$ = muralCards.pipe(
      switchMap(cards => merge(
        ...cards.map(el => fromEvent<Event>(el.nativeElement, 'mouseenter'))
      )),
      map(el => {
        const target = el.target as HTMLElement;
        return target.id;
      })
    )

    const mouseLeave$ = muralCards.pipe(
      switchMap(cards => merge(
        ...cards.map(el => fromEvent<Event>(el.nativeElement, 'mouseleave'))
      )),
      map(() => '')
    )

    this.currentTargetId$ = merge(
      mouseEnter$,
      mouseLeave$
    );


  }

}
