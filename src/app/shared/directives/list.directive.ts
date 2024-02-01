import {
  AfterViewInit,
  Directive,
  ElementRef,
  Renderer2,
  inject,
} from '@angular/core';

@Directive({
  selector: '[appList]',
  standalone: true,
})
export class ListDirective implements AfterViewInit {
  private readonly renderer = inject(Renderer2);

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    const items: string[] = this.el.nativeElement.textContent.split(',');

    this.el.nativeElement.textContent = '';
    items.forEach((item: string) => {
      const span = this.renderer.createElement('span') as HTMLSpanElement;
      span.innerText = item;
      span.classList.add('badge');
      this.el.nativeElement.appendChild(span);
    });
  }
}
