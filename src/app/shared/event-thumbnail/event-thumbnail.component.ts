import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-event-thumbnail',
  templateUrl: './event-thumbnail.component.html',
  styleUrl: './event-thumbnail.component.css',
})
export class EventThumbnailComponent {
  @Input() event: any;

  getStartTimeStyle() {
    if (this.event && this.event.time === '8:00 am')
      return {color: '#003300', 'font-weight': 'bold'};
    return {};
  }
}
