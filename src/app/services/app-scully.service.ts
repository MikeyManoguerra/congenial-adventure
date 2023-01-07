import { Injectable } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { BaseContent } from '../models/base-content';

@Injectable({
  providedIn: 'root'
})
export class AppScullyService {
  // extend scully api to include id param on every resource
  constructor(protected scully: ScullyRoutesService) { }

  public publishedRoutes$ = this.scully.available$ as Observable<BaseContent[]>;
}
