import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FocusHoverService {

  constructor() { }

  private readonly _identifierSource = new BehaviorSubject<string>('');
  readonly identifier$ = this._identifierSource.asObservable()

  _setIdentifer(id: string) {
    this._identifierSource.next(id);
  }

  getIdentifer() {
    return this._identifierSource.getValue();
  }

  updateIdentifer(id: string) {
    this._setIdentifer(id);
  }
}
