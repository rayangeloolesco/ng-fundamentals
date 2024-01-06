import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { ToastrService } from '../../common/toastr.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.css',
})
export class EventsListComponent implements OnInit {
  events: any = [];

  constructor(
    private toastrService: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.events = this.route.snapshot.data['events']; //events here must the same with the events: EventListResolver
  }

  handleThumbnailClick(eventName: any) {
    this.toastrService.success(eventName);
  }
}
