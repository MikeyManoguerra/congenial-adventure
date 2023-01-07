import { Component, OnInit } from '@angular/core';
import { SpeciesService } from 'src/app/services/species.service';

@Component({
  selector: 'species-list',
  templateUrl: './species-list.component.html',
  styleUrls: ['./species-list.component.scss']
})
export class SpeciesListComponent implements OnInit {
  constructor(private speciesService: SpeciesService) { }

  speciesList$ = this.speciesService.allSpecies();

  ngOnInit(): void {
  }
}
