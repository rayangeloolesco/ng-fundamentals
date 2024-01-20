import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from '../event.model';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.css',
})
export class EventsListComponent implements OnInit {
  events: IEvent[] | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.events = this.route.snapshot.data['events']; //events here must the same with the events: EventListResolver
  }
}
