import { ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { DiscernibleTextComponent } from '../components/discernible-text/discernible-text.component';

@Injectable({
  providedIn: 'root'
})
export class DiscernibleTextService {

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector
  ) { }


  labelElement(labelText: string){
    return this.labelComponent(labelText).location.nativeElement;
  }


  private labelComponent(labelText: string) {
    // https://stackoverflow.com/a/64008789/14888291
    const component = this.resolver.resolveComponentFactory(DiscernibleTextComponent).create(this.injector);
    component.instance.labelText = labelText;
    component.changeDetectorRef.detectChanges();

    return component;
  }
}
