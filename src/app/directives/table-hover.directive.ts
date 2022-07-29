import { Directive, HostListener } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appTableHover]'
})
export class TableHoverDirective {

  constructor(private elRef: ElementRef,
              private renderer: Renderer2,
              private vcRef: ViewContainerRef) {}
  
  @HostListener('mouseenter')
  onHover() {
    this.elRef.nativeElement.style.backgroundColor = 'lightgray';
  }
  @HostListener('mouseleave')
  onBlur() {
    this.elRef.nativeElement.style.backgroundColor = 'inherit';
  }
}
