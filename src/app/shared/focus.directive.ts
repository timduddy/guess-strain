import { Directive, AfterViewInit, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective implements AfterViewInit {

  constructor(public renderer: Renderer, public elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.renderer.invokeElementMethod(
      this.elementRef.nativeElement, 'focus', []);
  }

}
