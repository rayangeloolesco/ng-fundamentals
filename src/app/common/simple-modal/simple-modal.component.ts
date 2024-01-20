import { Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';
import { JQ_TOKEN } from '../j-query.service';

@Component({
  selector: 'app-simple-modal',
  templateUrl: './simple-modal.component.html',
  styleUrl: './simple-modal.component.css',
})
export class SimpleModalComponent {
  @Input() title: string = '';
  @Input() elementId: string = '';
  @ViewChild('modalcontainer') containerEl: ElementRef | undefined;
  @Input() closeOnBodyClick: string | undefined;

  constructor(@Inject(JQ_TOKEN) private $: any) {}

  closeModal() {
    if (this.closeOnBodyClick?.toLocaleLowerCase() === 'true') {
      this.$(this.containerEl!.nativeElement).modal('hide');
    }
  }
}
