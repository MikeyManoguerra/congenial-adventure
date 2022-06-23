import { ComponentFactoryResolver, ComponentRef, Injectable, Injector } from '@angular/core';
import { PopupComponent } from '../components/popup/popup.component';
import { DeserializedPoint } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class MapPopupService {

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector
  ) { }

  popupElement(point: DeserializedPoint){
    return this.popupComponent(point).location.nativeElement;
  }

  private popupComponent(point: DeserializedPoint): ComponentRef<PopupComponent> {
    // https://stackoverflow.com/a/64008789/14888291
    const component = this.resolver.resolveComponentFactory(PopupComponent).create(this.injector);
    component.instance.point = point;
    component.changeDetectorRef.detectChanges();

    return component;
  }

}
