import { Component, OnInit } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { map, Observable } from 'rxjs';
import { Species } from 'src/app/models/species';

@Component({
  selector: 'species-list',
  templateUrl: './species-list.component.html',
  styleUrls: ['./species-list.component.scss']
})
export class SpeciesListComponent implements OnInit {


  constructor(private scully: ScullyRoutesService) { }

  // todo fix any
  speciesList$: Observable<Species[]> = this.scully.available$.pipe(
    map(routes =>
      routes.filter(
        route => route.route.startsWith('/species/') && route.sourceFile?.endsWith('.md')
      ) as any[]
    )
  );

  ngOnInit(): void {
  }

}
