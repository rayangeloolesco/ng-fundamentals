import { Injectable } from '@angular/core';
import { EventService } from './event.service';
import { Resolve } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsListResolverService implements Resolve<any> {
  constructor(private eventService: EventService) {}

  resolve() {
    return this.eventService.getEvents().pipe(map((events) => events));
  }
}
