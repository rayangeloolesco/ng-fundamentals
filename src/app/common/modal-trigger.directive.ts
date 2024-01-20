import { Directive, ElementRef, Inject, Input, OnInit } from '@angular/core';
import { JQ_TOKEN } from './j-query.service';

@Directive({
  selector: '[appModalTrigger]',
})
export class ModalTriggerDirective implements OnInit {
  private el: HTMLElement;
  @Input('appModalTrigger') modalId: string = '';

  constructor(ref: ElementRef, @Inject(JQ_TOKEN) private $: any) {
    this.el = ref.nativeElement;
  }

  ngOnInit(): void {
    this.el.addEventListener('click', (e) => {
      this.$(`#${this.modalId}`).modal({}); //simple-modal here is the id in simple modal template
    });
  }
}
