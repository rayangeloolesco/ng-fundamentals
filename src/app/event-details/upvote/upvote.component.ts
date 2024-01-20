import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-upvote',
  templateUrl: './upvote.component.html',
  styleUrl: './upvote.component.css',
})
export class UpvoteComponent {
  @Input() count: number | undefined;
  @Input() set voted(val: any){
    this.iconColor = val ? 'red' : 'white';
  }
  @Output() vote = new EventEmitter();
  iconColor: string | undefined;

  onClick() {
    this.vote.emit({});
  }
}
