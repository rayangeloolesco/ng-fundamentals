import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css',
})
export class CreateEventComponent {
  isDirty: boolean = true;

  constructor(private router: Router) {}

  cancel() {
    this.router.navigate(['/events']);
  }
}
