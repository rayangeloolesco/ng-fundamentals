import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service';
import { ActivatedRoute, Params } from '@angular/router';
import { IEvent, ISession } from '../shared/event.model';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css',
})
export class EventDetailsComponent implements OnInit {
  event: IEvent | any;
  addMode: boolean = false;
  filterBy: string = 'all';
  sortBy: string = 'votes';

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.route.params.forEach((params: Params) => {
    //   this.eventService.getEvent(+params['id']).subscribe((event: IEvent) => {
    //     this.event = event;
    //     this.addMode = false;
    //   });
    // });

    // this.route.params.forEach((data) => {
    //   this.event = data['event'];
    //   this.addMode = false;
    // });

    this.route.params.forEach((params: Params) => {
      this.event =  this.route.snapshot.data['event']
        this.addMode = false;
      });
  }

  addSession() {
    this.addMode = !this.addMode;
  }

  saveNewSession(session: any) {
    const nextId = Math.max.apply(
      null,
      this.event?.sessions.map((s: { id: number }) => s.id)
    );
    session.id = nextId + 1;
    this.event.sessions.push(session);
    this.eventService.saveEvent(this.event).subscribe();
    this.addMode = false;
  }

  cancelAddSession() {
    this.addMode = false;
  }
}
