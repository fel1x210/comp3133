import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputFormat]',
  standalone: true,
})
export class InputFormat {
  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('blur')
  onBlur(): void {
    const input = this.el.nativeElement;
    input.value = input.value.toUpperCase();
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }
}
