import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISession } from '../../shared/event.model';
import { restrictedWords } from '../../shared/restricted-words.validator';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrl: './create-session.component.css',
})
export class CreateSessionComponent implements OnInit {
  newSessionForm: any;
  @Output() saveNewSession = new EventEmitter();
  @Output() cancelAddSession = new EventEmitter();
  name = new FormControl('');
  presenter = new FormControl('');
  duration = new FormControl('');
  level = new FormControl('');
  abstract = new FormControl('');

  ngOnInit(): void {
    this.name = new FormControl('', Validators.required);
    this.presenter = new FormControl('', Validators.required);
    this.duration = new FormControl('', Validators.required);
    this.level = new FormControl('', Validators.required);
    this.abstract = new FormControl('', [
      Validators.required,
      Validators.maxLength(400),
      restrictedWords(['foo', 'bar']),
    ]);

    this.newSessionForm = new FormGroup({
      name: this.name,
      presenter: this.presenter,
      duration: this.duration,
      level: this.level,
      abstract: this.abstract,
    });
  }

  saveSession(formValue: any) {
    let session: ISession = {
      id: undefined,
      name: formValue.name,
      duration: +formValue.duration,
      level: formValue.level,
      presenter: formValue.presenter,
      abstract: formValue.abstract,
      voters: [],
    };
    this.saveNewSession.emit(session);
  }

  cancel() {
    this.cancelAddSession.emit();
  }
}
