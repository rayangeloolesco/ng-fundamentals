import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsListComponent } from './shared/events-list/events-list.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { CreateEventComponent } from './shared/create-event/create-event.component';
import { Error404Component } from './errors/error-404/error-404.component';
import { EventsListResolverService } from './shared/events-list-resolver.service';
import { CreateSessionComponent } from './event-details/create-session/create-session.component';
import { EventResolverService } from './shared/event-resolver.service';

const routes: Routes = [
  {
    path: 'events/new',
    component: CreateEventComponent,
    canDeactivate: ['canDeactivateCreateEvent'],
  },
  {
    path: 'events',
    component: EventsListComponent,
    resolve: { events: EventsListResolverService },
  },
  {
    path: 'events/:id',
    component: EventDetailsComponent,
    resolve: {event: EventResolverService},
  },
  {
    path: 'events/session/new',
    component: CreateSessionComponent,
  },
  { path: '404', component: Error404Component },
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  {
    path: 'user',
    loadChildren: () =>
      import('./user/user/user.module').then((m) => m.UserModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
