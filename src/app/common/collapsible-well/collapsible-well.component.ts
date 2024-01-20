import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-collapsible-well',
  templateUrl: './collapsible-well.component.html',
  styleUrl: './collapsible-well.component.css',
})
export class CollapsibleWellComponent {
  @Input() title: string | undefined;
  visible: boolean = true;

  toggleContent() {
    this.visible = !this.visible;
  }
}
