import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ISession } from '../../shared/event.model';
import { AuthService } from '../../user/auth.service';
import { VoterService } from '../voter.service';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrl: './session-list.component.css',
})
export class SessionListComponent implements OnChanges {
  @Input() sessions: ISession[] | undefined;
  @Input() filterBy: string = '';
  @Input() sortBy: string = '';
  @Input() eventId!: number;
  visibleSessions: ISession[] | undefined = [];

  constructor(
    public authService: AuthService,
    private voterService: VoterService
  ) {}

  ngOnChanges(): void {
    if (this.sessions) {
      this.filterSessions(this.filterBy);
      this.sortBy === 'name'
        ? this.visibleSessions?.sort(sortByNameAsc)
        : this.visibleSessions?.sort(sortByVotesDesc);
    }
  }

  filterSessions(filter: string) {
    if (filter === 'all') {
      this.visibleSessions = this.sessions?.slice(0);
    } else {
      this.visibleSessions = this.sessions?.filter((s) => {
        return s.level.toLocaleLowerCase() === filter;
      });
    }
  }

  userHasVoted(session: ISession) {
    return this.voterService.userHasVoted(
      session,
      this.authService.currentUser!.userName
    );
  }

  toogleVote(session: ISession) {
    if (this.userHasVoted(session)) {
      this.voterService.deleteVoter(
        this.eventId,
        session,
        this.authService.currentUser!.userName
      );
    } else {
      this.voterService.addVoter(
        this.eventId,
        session,
        this.authService.currentUser!.userName
      );
    }
    if (this.sortBy === 'votes') {
      this.visibleSessions?.sort(sortByVotesDesc);
    }
  }
}

function sortByNameAsc(s1: ISession, s2: ISession) {
  if (s1.name > s2.name) return 1;
  else if (s1.name === s2.name) return 0;
  else return -1;
}

function sortByVotesDesc(s1: ISession, s2: ISession) {
  return s2.voters.length - s1.voters.length;
}
