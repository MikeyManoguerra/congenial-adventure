import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FocusHoverService {

  constructor() { }
  private readonly _identifierSource = new BehaviorSubject<[string, string]>(['', '']); // [prev, current]
  readonly identifier$ = this._identifierSource.asObservable()

  _setIdentifer(currentId: string) {
    const [, prevId] = this._identifierSource.getValue();
    this._identifierSource.next([prevId, currentId]);
  }

  getIdentifer() {
    return this._identifierSource.getValue();
  }

  updateIdentifer(id: string) {
    this._setIdentifer(id);
  }
}
