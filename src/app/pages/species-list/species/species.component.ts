import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { FocusHoverService } from 'src/app/services/focus-hover.service';
import { SpeciesService } from 'src/app/services/species.service';

@Component({
  selector: 'species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.scss']
})
export class SpeciesComponent implements OnInit {

  constructor(
    private speciesService: SpeciesService,
    private activatedRoute: ActivatedRoute,
    private focusHoverService: FocusHoverService
  ) { }


  public species$ = this.speciesService.species(this.activatedRoute);


  ngOnInit(): void {
    this.speciesService.speciesExamples(this.activatedRoute).pipe(tap(x => { console.log(x); })).subscribe()
  }

}
