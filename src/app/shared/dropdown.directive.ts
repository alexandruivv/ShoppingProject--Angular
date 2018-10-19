import {Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
  @Input() className: string;
  @HostBinding('class.open') classBinder: string;

  isOpen = false;

  ngOnInit() {

  }

  constructor(private elRef: ElementRef, private renderer: Renderer2) {

  }

  @HostListener('click') onClick(eventData: Event) {
    this.classBinder = this.isOpen ? '' : this.className;
    this.isOpen = !this.isOpen;
  }

}
