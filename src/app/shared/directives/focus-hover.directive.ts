import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[focusHover]'
})
export class FocusHoverDirective {
  constructor() { }
  @Output('focusHover') onInteraction = new EventEmitter<boolean>()

  @HostListener('mouseenter') onMouseEnter() {
    console.log('hey');

    this.onInteraction.emit(true);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.onInteraction.emit(false);
  }

  @HostListener('focusin') onFocus() {
    this.onInteraction.emit(true);
  }

  @HostListener('focusout') onBlur() {
    this.onInteraction.emit(false);
  }
}
