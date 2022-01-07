import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';
import { combineLatest, map, Observable, pluck, tap } from 'rxjs';
import { Mural } from 'src/app/models/mural';
@Component({
  selector: 'mural',
  templateUrl: './mural.component.html',
  styleUrls: ['./mural.component.scss']
})
export class MuralComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private scullyRoutesService: ScullyRoutesService) { }
  // public title:string;
  // public attribution:string;

  public mural: Observable<Mural | undefined> = combineLatest([
    this.activatedRoute.params.pipe(pluck('postId')),
    this.scullyRoutesService.available$
  ]).pipe(
    map(([postId, routes]) => {
      const mural = routes.find(route => route.route === `/murals/${postId}`)
      return mural as Mural;
    })
  )

  ngOnInit(): void {

  }

}
